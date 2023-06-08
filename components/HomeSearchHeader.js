import React from 'react'
import { View, Pressable, ActivityIndicator } from 'react-native'
import Text from './Text'
import { Searchbar } from 'react-native-paper'
import {
  AdjustmentsHorizontalIcon,
  MapIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'

function HomeSearchHeader({
  currentLocation,
  searchQuery,
  onChangeSearch,
  setIsLostSelected,
  isLostSelected,
}) {
  return (
    <View className="mx-1">
      <View className="flex-row justify-between items-center ml-5 ">
        <View>
          <Text className="font-bold text-2xl -mx-1.5">AmigosPerdidos</Text>
        </View>
        <View className="flex-row space-x-2 p-3 items-end">
          <Pressable
            onPress={() => {
              alert(
                "map not yet ready, come back later and why don't you speed it up"
              )
            }}
          >
            <MapIcon color="#00CCBB" />
          </Pressable>
          <Pressable
            onPress={() => {
              alert(
                "search not yet ready, come back later and why don't you speed it up"
              )
            }}
          >
            <MagnifyingGlassIcon color="#00CCBB" />
          </Pressable>
          <Pressable
            onPress={() => {
              alert(
                "adjustments not yet ready, come back later and why don't you speed it up"
              )
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
