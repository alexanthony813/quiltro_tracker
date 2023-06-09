import React from 'react'
import { View, Pressable } from 'react-native'
import Text from './Text'
import { MagnifyingGlassPlusIcon } from 'react-native-heroicons/outline'

function MisAmigosHeader({ setIsModalVisible }) {
  return (
    <View className="mx-1">
      <View className="flex-row justify-between items-center ml-5 ">
        <View>
          <Text className="font-bold text-2xl -mx-1.5">MisAmigosPerdidos</Text>
        </View>
        <View className="flex-row space-x-2 p-3 items-end">
          <Pressable
            onPress={() => {
              setIsModalVisible(true)
            }}
          >
            <MagnifyingGlassPlusIcon color="#00CCBB" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default MisAmigosHeader
