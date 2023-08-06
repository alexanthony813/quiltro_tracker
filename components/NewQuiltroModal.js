import React, { useState } from 'react'
import { Modal, Text, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewQuiltro } from '../api'
import Button from './Button'
import routes from '../navigation/routes'

import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField, SubmitButton } from './forms'
import * as ImageManipulator from 'expo-image-manipulator'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label('Nombre'),
  // age: Yup.string().label('Edad'), who knows/cares
  favoriteFoods: Yup.string().label('Comidas favoritas'),
  cannotOrWontEat: Yup.string().label('Comidas no puede comer'),
  location: Yup.string().label('Ubicacion'), // casita location may be null
  requestedItems: Yup.string().label('Realmente necesito'),
})

const NewQuiltroModal = ({ isVisible, setIsVisible, user, userLocation }) => {
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isQuiltroSubmitting, setIsQuiltroSubmitting] = useState(false)

  const handleSubmit = async (quiltro, { resetForm }) => {
    setIsQuiltroSubmitting(true)
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
      console.dir('ERROR') // TODO add better error handle in here
    }
    quiltro.photoUrl = presignedUrl.split('?')[0]
    quiltro.uid = user.uid

    const savedQuiltroResponse = await saveNewQuiltro({
      ...quiltro,
    })

    if (savedQuiltroResponse.ok) {
      console.log(user)
      const { uid } = user
      setIsVisible(false)
    }
    setIsQuiltroSubmitting(false)
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
      <ActivityIndicator animating={isQuiltroSubmitting} size="small" />
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
          Agregar un Quiltro
        </Text>
        <View style={{ paddingTop: 5, paddingBottom: 50 }}>
          <Form
            initialValues={{
              name: '',
              age: '',
              favoriteFoods: '',
              cannotOrWontEat: '',
              location: '',
              // requested_items: '',
              // medical_issues: '',
              // medical_history: '',
              // health_issues: '',
              // chip_id: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="name"
              placeholder="Nombre"
            />
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="favoriteFoods"
              placeholder="Comidas favoritas"
            />
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="cannotOrWontEat"
              placeholder="No puedo comer"
            />
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="location"
              placeholder="Ubicacion"
            />
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="requestedItems"
              placeholder="Necesito"
            />
            <ActivityIndicator animating={isImageUploading} size="small" />
            <View>
              <View className="flex justify-between">
                <Button
                  isDisabled={imageUpload}
                  onPress={handleImageUpload}
                  color="secondary"
                  title="Upload Image"
                />
                <SubmitButton
                  isDisabled={!imageUpload}
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

export default NewQuiltroModal
