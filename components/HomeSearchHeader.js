import React from 'react'
import { View, Pressable, ActivityIndicator } from 'react-native'
import Text from './Text'
import {
  AdjustmentsHorizontalIcon,
  MapIcon,
} from 'react-native-heroicons/outline'

function HomeSearchHeader({
  userLocation,
  searchQuery,
  onChangeSearch,
  setIsLostSelected,
  isLostSelected,
  setBottomSheetContentMode,
}) {
  return (
    <View className="mx-1 mb-5">
      <View className="flex-row justify-between items-center ml-5 ">
        <View>
          <Text className="font-bold text-2xl -mx-1.5">AmigosPerdidos</Text>
        </View>
        <View className="flex-row space-x-2 p-3 items-end">
          <Pressable
            onPress={() => {
              setBottomSheetContentMode('map')
            }}
          >
            <MapIcon color="#00CCBB" />
          </Pressable>
          <Pressable
            onPress={() => {
              setBottomSheetContentMode('filters')
            }}
          >
            <AdjustmentsHorizontalIcon color="#00CCBB" />
          </Pressable>
        </View>
      </View>
      <View className="flex-row border border-teal-600 w-full">
        <Pressable
          onPress={() => {
            setIsLostSelected(true)
          }}
          className={`cursor-pointer ${
            isLostSelected ? 'bg-teal-600' : 'bg-white'
          } w-1/2`}
        >
          <Text
            className={`flex justify-center ${
              isLostSelected ? 'text-white' : 'text-teal-600'
            }`}
          >
            Perdido
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setIsLostSelected(false)
          }}
          className={`cursor-pointer ${
            !isLostSelected ? 'bg-teal-600' : 'bg-gray-200'
          } w-1/2`}
        >
          <Text
            className={` flex justify-center
          ${!isLostSelected ? 'text-white' : 'text-teal-600'}
          `}
          >
            Encontrado
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default HomeSearchHeader
