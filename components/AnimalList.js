import React from 'react'
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'

// CSS not rendering on this component for some reason...

const AnimalList = (props) => {
  const { animals } = props
  console.log(props)
  console.log(animals)
  return (
    <FlatList
      data={animals}
      ListHeaderComponent={
        <View>
          <Text>Lista de Amigos Perdidos</Text>
        </View>
      }
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity>
            <Image
              source={{ uri: item.photo_url }}
              className="h-36 w-36 rounded-sm"
            />
            <View className=" px-3 pb-4">
              <Text className="font-bold text-lg pt-2">{item.name}</Text>
              <View></View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default AnimalList
