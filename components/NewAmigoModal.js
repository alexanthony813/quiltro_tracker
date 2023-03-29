import React, { useState, useEffect } from 'react'
import { Modal, Pressable, Text, TextInput, View } from 'react-native'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import * as ImagePicker from 'expo-image-picker'

const NewAmigoModal = (props) => {
  const { closeModalHandler, isModalVisible } = props
  const [species, setSpecies] = useState('')
  const [lastSeenAddress, setLastSeenAddress] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [ownerNumber, setOwnerNumber] = useState('')
  const [imageUpload, setImageUpload] = useState(null) // todo break up and only save image when posting new Amigo?
  const [imageUrl, setImageUrl] = useState(null)

  const handleSave = async () => {
    // Implement save logic here using the input field values

    const presignedUrlRequest = await fetch('http://localhost:3000/s3')
    const presignedUrlJSON = await presignedUrlRequest.json()
    const presignedUrl = presignedUrlJSON.url


    const savedAmigoResponse = await fetch('http://localhost:3000/amigos', {
      method: 'POST',
      // headers: {
      // "Content-Type": "multipart/form-data"
      // },
      body: {
        species,
        last_seen_address: lastSeenAddress,
        name,
        description,
        message,
        owner_number: ownerNumber,
      },
    })
    const savedAmigo = await savedAmigoResponse.json()
    console.dir(savedAmigo)
    if (savedAmigo.status === 200) {
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
        body: imageUpload,
      })
    }

    closeModalHandler(false)
  }

  const handleImageUpload = async (event) => {
    event.preventDefault()
    // const reader = new FileReader()
    // launchImageLibrary({}, (response) => {
    //   if (response) {
    //     setImageUpload(imageUpload)
    //   }
    // })
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUpload(result.assets[0].uri);
    }
  
  }
  return (
    <View
      style={{
        color: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              paddingHorizontal: 24,
              paddingVertical: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Agregar un Amigo
            </Text>
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Species"
              value={species}
              onChangeText={setSpecies}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Last Seen Address"
              value={lastSeenAddress}
              onChangeText={setLastSeenAddress}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Message"
              value={message}
              onChangeText={setMessage}
            />
            <TextInput
              style={{
                width: '100%',
                padding: 8,
                borderBottomWidth: 2,
                borderBottomColor: 'gray',
              }}
              placeholder="Owner Number"
              value={ownerNumber}
              onChangeText={setOwnerNumber}
            />
            <Pressable
              style={{
                width: 100,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor: 'blue',
                marginTop: 16,
              }}
              onPress={handleImageUpload}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Upload Image
              </Text>
            </Pressable>
            {imageUpload && <Text>Image Uploaded</Text>}
            <Pressable
              style={{
                width: 100,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor: 'gray',
                marginTop: 16,
                marginRight: 8,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                paddingVertical: 8,
                borderRadius: 4,
                backgroundColor: 'blue',
                marginTop: 16,
              }}
              onPress={async () => {
                await handleSave()
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NewAmigoModal
