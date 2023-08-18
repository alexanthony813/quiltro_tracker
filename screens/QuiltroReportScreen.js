import { useState } from 'react'
import Button from '../components/Button'
import Screen from '../components/Screen'
import Text from '../components/Text'
import { Switch, View, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewStatusEvent } from '../api'
import routes from '../navigation/routes'
import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField, SubmitButton } from '../components/forms'
import { useNavigation } from '@react-navigation/native'
import * as ImageManipulator from 'expo-image-manipulator'
import useAuth from '../contexts/auth/useAuth'

const validationSchema = Yup.object().shape({
  body: Yup.string().min(1).label('Message'),
})

// TODO delete
function QuiltroReportScreen({ route }) {
  const { user } = useAuth()
  const { quiltro } = route.params
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigation = useNavigation()
  console.log('-------')
  console.dir(quiltro)
  console.log('-------')
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
    statusEvent.quiltroId = quiltro.quiltroId

    const from = user.uid
    const { body } = statusEvent
    statusEvent.details = {
      body,
      from,
    }

    const savedStatusEvent = await saveNewStatusEvent({
      ...statusEvent,
    })

    if (savedStatusEvent.ok) {
      setIsSubmitting(false)
      navigation.navigate(routes.QUILTRO_DETAILS, {
        quiltro,
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
          Reportar un Quiltro
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
            <FormField maxLength={255} name="body" placeholder="Message" />
            <ActivityIndicator animating={isImageUploading} size="small" />
            <View className="flex justify-between">
              <Button
                onPress={handleImageUpload}
                color="secondary"
                title="Subir Imagen"
                isDisabled={imageUpload}
              />
              <SubmitButton
                className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                title="Guardar"
                isDisabled={!imageUpload}
              />
              <Button
                color="medium"
                title="Cancel"
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
