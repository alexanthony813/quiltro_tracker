import React, { useState } from 'react'
import { Modal, Text, Switch, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewStatusEvent } from '../api'
import Button from './Button'
import routes from '../navigation/routes'

import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField, SubmitButton } from './forms'

import * as ImageManipulator from 'expo-image-manipulator'

const validationSchema = Yup.object().shape({
  body: Yup.string().min(1).label('Message'),
})

// TODO delete
const ReportProblemModal = ({
  quiltro,
  setReportingQuiltro,
  userLocation,
  user,
}) => {
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSecuredEnabled, setIsSecuredEnabled] = useState(false)
  const [isSecured, setIsSecured] = useState(false)
  const [showImageUploadWarning, setImageUploadWarning] = useState(false)
  const navigation = useNavigation()

  const handleSubmit = async (statusEvent) => {
    setIsSubmitting(true)
    if (imageUpload) {
      const presignedUrlRequest = await getPresignedUrl()
      const presignedUrlJSON = await presignedUrlRequest.json()
      const presignedUrl = presignedUrlJSON.url
      statusEvent.photo_url = presignedUrl.split('?')[0]
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
    }
    statusEvent.location = userLocation
    statusEvent.quiltroId = quiltro.quiltroId
    statusEvent.status = isSecured ? 'recovered' : 'sighted'

    const from = user.uid
    const { body } = statusEvent
    statusEvent.details = {
      body,
      from,
    }

    const savedStatusEvent = await saveNewStatusEvent({
      ...statusEvent,
    })

    const message = {
      to: 'ExponentPushToken[ZODa4cP9q4KF75vId7ZnI0]',
      title: `${quiltro.name} was ${statusEvent.status}!`,
      from,
      body,
    }
    if (savedStatusEvent.ok && sentNotification) {
      setReportingQuiltro(null)
    }
    setIsSubmitting(false)
    navigation.navigate(routes.HOME)
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
    setIsSecuredEnabled(true)
    setIsImageUploading(false)
  }
  console.log(quiltro)
  return (
    <Modal visible={!!quiltro}>
      <ActivityIndicator animating={isSubmitting} size="small" />
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
          Reportar un Quiltro
        </Text>
        <View style={{ paddingTop: 5, paddingBottom: 50 }}>
          <Form
            initialValues={{
              // isSecured: false,
              body: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
            validationSchema={validationSchema}
          >
            {/* <FormField maxLength={255} name="location" placeholder="Location" /> */}
            <FormField maxLength={255} name="body" placeholder="Message" />
            <View className="flex-row justify-stretch">
              <Text>Tengo la mascota {'  '}</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isSecuredEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setIsSecured(!isSecured)
                }}
                value={isSecured}
              />
            </View>
            <ActivityIndicator animating={isImageUploading} size="small" />
            <View className="flex justify-between">
              <Button
                onPress={(e) => {
                  if (isSecured) {
                    handleImageUpload(e)
                  } else {
                    setImageUploadWarning(true)
                  }
                }}
                color="secondary"
                title="Upload Image"
                isDisabled={!isSecured}
              />
              <SubmitButton
                // onPress={() => {
                //   saveNewStatusEvent()
                // }}
                className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                title="Save"
              />
              <Button
                color="medium"
                title="Cancel"
                onPress={() => setReportingQuiltro(null)}
              />
            </View>
          </Form>
        </View>
        {imageUpload && <Text>Image Uploaded</Text>}
      </View>
    </Modal>
  )
}

export default ReportProblemModal
