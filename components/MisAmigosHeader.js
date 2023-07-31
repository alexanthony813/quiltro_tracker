import React from 'react'
import { View, Pressable } from 'react-native'
import Text from './Text'
import { PlusCircleIcon } from 'react-native-heroicons/outline'

function MisAmigosHeader({ quiltro, setIsModalVisible }) {
  const headerText = quiltro
    ? `MisQuiltrosSeguidos ${quiltro.name}`
    : `MisQuiltrosSeguidos`
  return (
    <View className="mx-1">
      <View className="flex-row justify-between items-center ml-5 ">
        <View>
          <Text className="font-bold text-2xl -mx-1.5">{headerText}</Text>
        </View>
        <View className="flex-row space-x-2 p-3 items-end">
          {quiltro ? null : (
            <Pressable
              onPress={() => {
                setIsModalVisible(true)
              }}
            >
              <PlusCircleIcon color="#00CCBB" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )
}

export default MisAmigosHeader
