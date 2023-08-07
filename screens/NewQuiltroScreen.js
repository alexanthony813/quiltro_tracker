import React, { useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Screen from '../components/Screen'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewQuiltro, saveNewRequestedItems } from '../api'
import Button from '../components/Button'
import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField } from '../components/forms'
import * as ImageManipulator from 'expo-image-manipulator'
import NewRequestedItemModal from '../components/NewRequestedItemModal'
import useAuth from '../contexts/auth/useAuth'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label('Nombre'),
  favoriteFoods: Yup.string().label('Comidas favoritas'),
  location: Yup.string().label('Ubicacion'), // casita location may be null
})

function NewQuiltroScreen({ route }) {
  const { user } = useAuth()
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isQuiltroSubmitting, setIsQuiltroSubmitting] = useState(false)
  const [requestedItems, setRequestedItems] = useState([])

  const appendRequestedItem = (newRequestedItem) => {
    const newRequestedItems = requestedItems.slice()
    newRequestedItems.push(newRequestedItem)
    setRequestedItems(newRequestedItems)
  }

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
      await saveNewRequestedItems(quiltroId, requestedItems) //TODO check this response
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

  return (
    <Screen>
      <NewRequestedItemModal
        visible={isVisible}
        setIsVisible={setIsVisible}
        appendRequestedItem={appendRequestedItem}
      />
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
              // allergies: '',
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
              name="location"
              placeholder="Ubicacion"
            />
            <ActivityIndicator animating={isImageUploading} size="small" />
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  styles={{
                    marginBottom: '0.5em',
                    borderRadius: '10%',
                    width: '50%',
                  }}
                  isDisabled={imageUpload}
                  onPress={handleImageUpload}
                  color="secondary"
                  title="Cargar un Imagen"
                />
                <Button
                  styles={{
                    marginBottom: '0.5em',
                    borderRadius: '10%',
                    width: '30%',
                  }}
                  isDisabled={!imageUpload}
                  className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                  title="Save"
                />
              </View>
            </View>
          </Form>
        </View>
        {imageUpload && <Text>Image Uploaded</Text>}
      </View>
    </Screen>
  )
}

export default NewQuiltroScreen
