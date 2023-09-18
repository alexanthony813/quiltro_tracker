import { useState } from 'react'
import Button from '../components/Button'
import Screen from '../components/Screen'
import Text from '../components/Text'
import { View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveStatusEvent } from '../api'
import routes from '../navigation/routes'
import * as Yup from 'yup'
import { getPresignedUrl, putToS3 } from '../api'
import { Form, FormField, SubmitButton } from '../components/forms'
import { useNavigation } from '@react-navigation/native'
import * as ImageManipulator from 'expo-image-manipulator'
import useAuth from '../contexts/auth/useAuth'

const validationSchema = Yup.object().shape({
  body: Yup.string().min(1).label('Mensaje'),
})

function QuiltroReportScreen({ route }) {
  const { user } = useAuth()
  const { quiltro } = route.params
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation = useNavigation()
  const handleSubmit = async (statusEvent) => {
    try {
      setIsSubmitting(true)
      if (imageUpload) {
        const presignedUrlRequest = await getPresignedUrl()
        const presignedUrlJSON = await presignedUrlRequest.json()
        const presignedUrl = presignedUrlJSON.url
        statusEvent.photoUrl = presignedUrl.split('?')[0]
        const rawBase64 = imageUpload.base64
        var buffer = Buffer.from(
          rawBase64.replace(/^data:image\/\w+;base64,/, ''),
          'base64'
        )
        const s3Result = await putToS3({ presignedUrl, buffer })

        if (s3Result.status !== 200) {
          saveAnalyticsEvent({
            status: 's3_upload',
            details: {
              s3Result,
              user,
              succeeded: false,
            },
          })
        }
      }
      statusEvent.quiltroId = quiltro.quiltroId
      statusEvent.status = 'problem_reported'
      const from = user.uid
      const { body } = statusEvent
      statusEvent.details = {
        body,
        from,
      }

      const savedStatusEventResponse = await saveStatusEvent(statusEvent)

      if (savedStatusEventResponse.ok) {
        setIsSubmitting(false)
        navigation.navigate(routes.QUILTRO_DETAILS, {
          quiltro,
        })
      }
    } catch (error) {
      saveAnalyticsEvent({
        status: 'report_problem',
        details: {
          error,
          succeeded: false,
          user,
        },
      })
    }
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
    }
    setIsImageUploading(false)
  }

  return (
    <Screen>
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
          Reportar un Problema
        </Text>
        <View style={{ paddingTop: 5, paddingBottom: 50 }}>
          <Form
            initialValues={{
              body: '',
            }}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
            validationSchema={validationSchema}
          >
            <FormField maxLength={255} name="body" placeholder="Mensaje" />
            <ActivityIndicator animating={isImageUploading} size="small" />
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                onPress={handleImageUpload}
                color="secondary"
                title="Subir Imagen"
                isDisabled={imageUpload}
              />
              <SubmitButton
                style={{
                  padding: '0.25rem 1rem',
                  borderRadius: '0.375rem',
                  color: 'white',
                  transition: 'background-color 0.3s',
                }}
                title="Guardar"
                isDisabled={!imageUpload}
              />
              <Button
                color="medium"
                title="Cancelar"
                onPress={() => {
                  navigation.navigate(routes.QUILTRO_DETAILS, {
                    quiltro,
                  })
                }}
              />
            </View>
          </Form>
        </View>
        {imageUpload && <Text>Imagen Cargada</Text>}
      </View>
    </Screen>
  )
}

export default QuiltroReportScreen
