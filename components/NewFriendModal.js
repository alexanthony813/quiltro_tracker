import React, { useState, useEffect } from 'react'
import { Modal, Pressable, Text, TextInput, View } from 'react-native'
import AWS from 'aws-sdk'

const NewFriendModal = (props) => {
  const { closeModalHandler, isModalVisible } = props
  const [species, setSpecies] = useState('')
  const [lastSeenAddress, setLastSeenAddress] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [ownerNumber, setOwnerNumber] = useState('')
  const [imageUpload, setImageUpload] = useState(null);

  const handleSave = () => {
    // Implement save logic here using the input field values
    saveImageUpload(imageUpload)
    closeModalHandler(false)
  }

  const handleImageUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
  
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file);
      setImageUpload(file);
    }
  }

  const saveImageUpload = (imageUpload) => {
    if (!imageUpload) {
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageUpload.name,
      Body: imageUpload,
      ContentType: imageUpload.type,
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data.Location);
    });
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
              Add a New Friend
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
              onPress={handleSave}
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

export default NewFriendModal
