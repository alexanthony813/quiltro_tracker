import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from 'buffer'
import { saveNewAmigo } from '../api'
import useLocation from '../hooks/useLocation'
import Button from '../components/Button'
import Screen from '../components/Screen'
import * as Yup from 'yup'
import { getPresignedUrl } from '../api'
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms'
// return (
//   <SafeAreaView>
//     <Text>Here is where the add/check user amigos will go</Text>
//     <Text>Important to note, we will show this by default if any exists</Text>
//     <Text>Important to note, if button pressed it will automatically open the new modal</Text>
//     <Text>Map will stay available on this page</Text>
//   </SafeAreaView>
// )

const validationSchema = Yup.object().shape({
  species: Yup.string().required().min(1).label('Species'),
  lastSeenAddress: Yup.string().required().min(1).label('Last Seen Address'),
  name: Yup.string().required().min(1).label('Name'),
  description: Yup.string().label('Description'),
  message: Yup.string().required().min(1).label('Message'),
  ownerNumber: Yup.string().required().min(1).label('Contact Number'),
})

const NewAmigoScreen = (props) => {
  const userLocation = useLocation()
  const currentUserId = 5
  const [species, setSpecies] = useState('')
  const [lastSeenAddress, setLastSeenAddress] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [ownerNumber, setOwnerNumber] = useState('')
  const [imageUpload, setImageUpload] = useState(null) // todo break up and only save image when posting new Amigo?

  const handleSubmit = async (amigo, { resetForm }) => {
    // Implement save logic here using the input field values
    // const navigation = useNavigation()
    const presignedUrlRequest = await getPresignedUrl()
    const presignedUrlJSON = await presignedUrlRequest.json()
    const presignedUrl = presignedUrlJSON.url
    const rawBase64 =
      imageUpload.assets &&
      imageUpload.assets[0] &&
      imageUpload.assets[0].base64
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
    // const photo_url = presignedUrl.split('?')[0]
    amigo.photo_url = presignedUrl.split('?')[0]
    amigo.userLocation = userLocation
    // TODO make sure saveNewAmigo and other are attached to export object to make more easily noticable as ASYNC action
    const savedAmigo = await saveNewAmigo({
      amigo,
    })
    // error handle
    // const savedAmigoJson = await savedAmigo.json()
    // const newAmigos = amigos.slice()
    // newAmigos.unshift(savedAmigoJson)
  }

  const handleImageUpload = async (event) => {
    event.preventDefault()
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      exif: true,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 0.7,
      base64: true,
    })

    if (!result.canceled) {
      setImageUpload(result)
    } else {
      console.log('successful image upload')
    }
  }

  /*

*/
  return (
    <Screen>
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
              lastSeenAddress: '',
              name: '',
              description: '',
              message: '',
              ownerNumber: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField maxLength={255} name="name" placeholder="Name" />
            <FormField maxLength={255} name="species" placeholder="Species" />
            <FormField
              maxLength={255}
              name="lastSeenAddress"
              placeholder="Last Seen Address"
            />
            <FormField
              maxLength={255}
              name="description"
              placeholder="Description"
            />
            <FormField maxLength={255} name="message" placeholder="Message" />
            <FormField
              maxLength={255}
              name="ownerNumber"
              placeholder="Owner Number"
            />

            <View>
              <Button
                onPress={handleImageUpload}
                color="secondary"
                title="Upload Image"
              />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Button color="medium" title="Cancel" />
                <SubmitButton title="Save" />
              </View>
            </View>
          </Form>
        </View>
        {imageUpload && <Text>Image Uploaded</Text>}
      </View>
    </Screen>
  )
}

export default NewAmigoScreen
