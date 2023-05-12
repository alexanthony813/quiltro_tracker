import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import {
  UserIcon,
  ChevronDownIcon,
  MapIcon,
  ArrowRightIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline'
import AmigoList from '../components/AmigoList'
import { getAmigos } from '../api'
import useLocation from '../hooks/useLocation'
import useApi from '../hooks/useApi'
import { ScrollView } from 'react-native-gesture-handler'
import { SearchBar } from 'react-native-elements'

const displayNameMap = {
  dog: 'Perros Identificados',
  cat: 'Gatos Identificados',
  miscellaneous: 'Varios Identificando',
  unidentified: 'No Identificado (con Avistamiento y Foto)',
}

const HomeSearchScreen = ({ navigation, route }) => {
  const {
    data: amigos,
    error,
    isLoading,
    request: loadAmigos,
  } = useApi(getAmigos)

  console.dir(amigos)
  useEffect(() => {
    loadAmigos()
  }, [JSON.stringify(amigos)])
  const currentLocation = useLocation()
  const categories = {
    // this will control what rows we show and dynamically render otherwise
    dog: [],
    cat: [],
    miscellaneous: [],
    // unidentified: [], // non MVP, tracking amigos without posts
  }

  // if (!amigos) {
  //   return <ActivityIndicator animating={isLoading} size="large" />
  // }

  const categorizedAnimalsObject = amigos
    ? amigos.reduce((acc, curr) => {
        if (acc.hasOwnProperty(curr.species)) {
          acc[curr.species].push(curr)
        } else {
          acc.miscellaneous.push(curr)
        }
        return acc
      }, categories)
    : categories

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row pb-3 items-center mt-4 ml-5 space-x-2 ">
        <UserIcon size={35} />
        <View>
          {currentLocation ? (
            <Text className="font-bold text-xl">
              Buscando en {currentLocation.latitude} &&{' '}
              {currentLocation.longitude}
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          ) : (
            <ActivityIndicator animating={isLoading} size="small" />
          )}
        </View>
      </View>
      
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Puedes buscar en el mapa tambien:</Text>
          <MapIcon color="#00CCBB" />
        </View>
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Puedes cambiar tu Ubicacion:</Text>
          <Pressable
            onPress={() => {
              alert(
                "map not yet ready, come back later and why don't you speed it up"
              )
            }}
          >
            <MapPinIcon color="#00CCBB" />
          </Pressable>
        </View>
      </View>

      {/* Category by species */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-gray-100"
      >
        {Object.keys(categorizedAnimalsObject).map((animalCategory) => {
          const displayAnimalCategory = displayNameMap[animalCategory]

          return (
            <View key={animalCategory}>
              <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-ig">
                  {displayAnimalCategory}
                </Text>
                {/* this will show straight list, better than filters */}
                <ArrowRightIcon color="#00CCBB" />
              </View>
              <ActivityIndicator animating={isLoading} size="large" />
              <AmigoList amigos={categorizedAnimalsObject[animalCategory]} />
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeSearchScreen
