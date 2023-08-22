import { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Screen from '../components/Screen'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewQuiltro, saveNewRequestedItems, getUserQuiltros } from '../api'
import Button from '../components/Button'
import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import { Form, FormField, FormTextArea, FormSwitch } from '../components/forms'
import * as ImageManipulator from 'expo-image-manipulator'
import NewRequestedItemModal from '../components/NewRequestedItemModal'
import useAuth from '../contexts/auth/useAuth'
import SubmitButton from '../components/forms/SubmitButton'
import QuiltroRequestList from '../components/QuiltroRequestList'
import { useNavigation } from '@react-navigation/native'
import routes from '../navigation/routes'

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label('Nombre'),
  favoriteFoods: Yup.string().label('Comidas favoritas'),
  allergies: Yup.string().label('Alergias'),
  // location: Yup.string().label('Ubicación'), // casita location, good to record but unnecessary to show on profile
  description: Yup.string().label('Descripción'),
  isAdoptable: Yup.boolean().label('Adoptable'),
})

function NewQuiltroScreen({ route }) {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [imageUpload, setImageUpload] = useState(null)
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isQuiltroSubmitting, setIsQuiltroSubmitting] = useState(false)
  const [requestedItems, setRequestedItems] = useState([])
  const [displayName, setDisplayName] = useState(null)

  useEffect(() => {}, [isModalVisible])

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
      const quiltro = await savedQuiltroResponse.json()
      const { quiltroId } = quiltro
      await saveNewRequestedItems(quiltroId, requestedItems) //TODO check this response
      setIsQuiltroSubmitting(false)
      getUserQuiltros()
      navigation.navigate(routes.QUILTRO_LIST)
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
    } else {
      console.dir('successful image upload')
    }
    setIsImageUploading(false)
  }

  return (
    <Screen>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          paddingTop: 8,
          paddingHorizontal: 24,
          height: '100%',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          {'Agregar un Perro'}
        </Text>
        <View style={{ paddingTop: 5, paddingBottom: 50 }}>
          <Form
            initialValues={{
              name: '',
              favoriteFoods: '',
              location: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <FormField
              style={{ width: '100%' }}
              maxLength={255}
              name="name"
              placeholder="Nombre"
              onBlur={(e) => {
                setDisplayName(e.target.value)
              }}
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
              name="allergies"
              placeholder="Alergias"
            />
            {/* <FormField this seems pretty silly to have
              style={{ width: '100%' }}
              maxLength={255}
              name="location"
              placeholder="Ubicación"
            /> */}
            <FormTextArea
              style={{ width: '100%' }}
              maxLength={255}
              name="description"
              placeholder="Descripción"
            />
            <FormSwitch
              name="isAdoptable"
              title="¿Está en adopción?"
              placeholder="Adoptable"
            />
            <ActivityIndicator animating={isImageUploading} size="small" />
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
                  marginLeft: '0.5em',
                  marginRight: '0.5em',
                  width: '30%',
                }}
                isDisabled={imageUpload}
                onPress={handleImageUpload}
                color="secondary"
                title="Cargar un Imagen"
              />
              <SubmitButton
                styles={{
                  marginBottom: '0.5em',
                  borderRadius: '10%',
                  marginLeft: '0.5em',
                  marginRight: '0.5em',
                  width: '30%',
                }}
                isDisabled={!imageUpload}
                className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                title="Guardar"
              />
            </View>
          </Form>
          <ActivityIndicator animating={isQuiltroSubmitting} size="small" />
        </View>
        {imageUpload && <Text>Imagen Cargada</Text>}
        {requestedItems ? (
          <QuiltroRequestList requestedItems={requestedItems} />
        ) : null}
      </View>
    </Screen>
  )
}

export default NewQuiltroScreen
