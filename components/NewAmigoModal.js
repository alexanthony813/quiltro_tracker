import React, { useState } from 'react'
import { Modal, Text, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewAmigo } from '../api'
import Button from './Button'
import routes from '../navigation/routes'

import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField, SubmitButton } from './forms'

import * as ImageManipulator from 'expo-image-manipulator'

const validationSchema = Yup.object().shape({
  species: Yup.string().required().min(1).label('Species'),
  last_seen_location: Yup.string()
    .required()
    .min(1)
    .label('Last Seen Location'),
  // last_seen_date: Yup.date().min( TODO
  //   Yup.ref('originalEndDate'),
  //   ({ min }) => `Date needs to be before ${formatDate(min)}!!`,
  // ),
  name: Yup.string().required().min(1).label('Name'),
  description: Yup.string().label('Description'),
  body: Yup.string().required().min(1).label('Message'),
  owner_number: Yup.string().required().min(1).label('Contact Number'),
})

const NewAmigoModal = ({ isVisible, setIsVisible, user, userLocation }) => {
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isAmigoSubmitting, setIsAmigoSubmitting] = useState(false)

  const handleSubmit = async (amigo, { resetForm }) => {
    setIsAmigoSubmitting(true)
    const presignedUrlRequest = await getPresignedUrl()
    const presignedUrlJSON = await presignedUrlRequest.json()
    const presignedUrl = presignedUrlJSON.url
    const rawBase64 = imageUpload.base64
    var buffer = Buffer.from(
      rawBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )
    const s3Result = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
        'Access-Control-Allow-Origin': '*',
        'Content-Encoding': 'base64',
      },
      body: buffer,
    })
    if (s3Result.status !== 200) {
      console.dir('ERROR') // TODO add better error handle up in here
    }
    amigo.photo_url = presignedUrl.split('?')[0]
    amigo.last_seen_location = userLocation
    amigo.last_seen_date = Date.now // TODO last_seen_date ||
    amigo.owner_id = user.userId
    amigo.status = 'lost'

    const savedAmigo = await saveNewAmigo({
      ...amigo,
    })

    if (savedAmigo.ok) {
      navigation.navigate(routes.HOME)
      setIsVisible(false)
    }
    setIsAmigoSubmitting(false)
  }

  const handleImageUpload = async (event) => {
    setIsImageUploading(true)
    event.preventDefault()
    const result = await ImagePicker.launchImageLibraryAsync({
      exif: true,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.1,
      base64: true,
    })

    const finalResult = await ImageManipulator.manipulateAsync(
      result.assets[0]?.uri,
      [{ resize: { width: 640, height: 960 } }],
      { compress: 1 }
    )

    if (!result.canceled) {
      setImageUpload(finalResult)
    } else {
      console.dir('successful image upload')
    }
    setIsImageUploading(false)
  }

  /*

*/
  return (
    <Modal visible={isVisible}>
      <ActivityIndicator animating={isAmigoSubmitting} size="small" />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          paddingHorizontal: 24,
          paddingVertical: 16,
          height: '100%',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Agregar un Amigo
        </Text>
        <View style={{ paddingTop: 5, paddingBottom: 50 }}>
          <Form
            initialValues={{
              species: '',
              last_seen_location: '',
              last_seen_date: '',
              name: '',
              description: '',
              body: '',
              owner_number: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField maxLength={255} name="name" placeholder="Name" />
            <FormField maxLength={255} name="species" placeholder="Species" />
            {/* <FormPicker maxLength={255} name="species" items={["dog", "cat", "other"]} placeholder="Species" /> */}
            <FormField
              maxLength={255}
              name="last_seen_location"
              placeholder="Last Seen Location"
            />
            {/* <FormField
              maxLength={255}
              name="last_seen_date"
              placeholder="Last Seen Date"
            /> */}
            <FormField
              maxLength={255}
              name="description"
              placeholder="Description"
            />
            <FormField maxLength={255} name="body" placeholder="Message" />
            <FormField
              maxLength={255}
              name="owner_number"
              placeholder="Owner Number"
            />

            <ActivityIndicator animating={isImageUploading} size="small" />
            <View>
              <View className="flex justify-between">
                <Button
                  onPress={handleImageUpload}
                  color="secondary"
                  title="Upload Image"
                />
                <SubmitButton
                  className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                  title="Save"
                />
                <Button
                  color="medium"
                  title="Cancel"
                  onPress={() => setIsVisible(false)}
                />
              </View>
            </View>
          </Form>
        </View>
        {imageUpload && <Text>Image Uploaded</Text>}
      </View>
    </Modal>
  )
}

export default NewAmigoModal
