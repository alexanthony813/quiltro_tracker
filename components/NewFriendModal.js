import React, { useState, useEffect } from 'react'
import { Modal, Pressable, Text, TextInput, View } from 'react-native'

const NewFriendModal = (props) => {
  const { closeModalHandler, isModalVisible } = props
  const [species, setSpecies] = useState('')
  const [lastSeenAddress, setLastSeenAddress] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [ownerNumber, setOwnerNumber] = useState('')
  const [image, setImage] = useState(null)

  const handleImageUpload = async () => {
    // Implement image upload logic here
  }

  const handleSave = () => {
    // Implement save logic here using the input field values
    closeModalHandler(false)
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white rounded-lg px-6 py-4">
            <Text className="text-lg font-bold mb-2">Add a New Pet</Text>
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Species"
              value={species}
              onChangeText={setSpecies}
            />
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Last Seen Address"
              value={lastSeenAddress}
              onChangeText={setLastSeenAddress}
            />
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Message"
              value={message}
              onChangeText={setMessage}
            />
            <TextInput
              className="w-full p-2 border-b-2 border-gray-300 mb-2"
              placeholder="Owner Number"
              value={ownerNumber}
              onChangeText={setOwnerNumber}
            />
            <Pressable
              className="w-36 py-2 rounded-lg bg-blue-500"
              onPress={handleImageUpload}
            >
              <Text className="text-white font-bold text-center">
                Upload Image
              </Text>
            </Pressable>
            {image && <Text>Image Uploaded</Text>}
            <Pressable
              className="w-36 py-2 rounded-lg bg-gray-300 mt-4 mr-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-bold text-center">Cancel</Text>
            </Pressable>
            <Pressable
              className="w-36 py-2 rounded-lg bg-blue-500 mt-4"
              onPress={handleSave}
            >
              <Text className="text-white font-bold text-center">Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NewFriendModal;
