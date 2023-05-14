import React from 'react'
import { View, Pressable, ActivityIndicator } from 'react-native'
import Text from './Text'
import { Searchbar } from 'react-native-paper'
import { MapIcon, MapPinIcon } from 'react-native-heroicons/outline'

function HomeSearchHeader({ currentLocation, searchQuery, onChangeSearch }) {
  return (
    <View className="mx-1">
      <View className="flex-row pb-3 items-center mt-4 ml-5 space-x-2 ">
        {/* <UserIcon size={35} /> */}
        <View>
          <Text className="font-bold text-xl">
            Ubicacion actual:
            {currentLocation ? (
              <Text>
                Lat: {currentLocation.latitude.toString().slice(0, 5)} & Long:{' '}
                {currentLocation.longitude.toString().slice(0, 5)}
              </Text>
            ) : (
              <ActivityIndicator animating={true} size="small" />
            )}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Buscar en el mapa aqui:</Text>
          <Pressable
            onPress={() => {
              alert(
                "map not yet ready, come back later and why don't you speed it up"
              )
            }}
          >
            <MapIcon color="#00CCBB" />
          </Pressable>
        </View>
        {/* not mvp..not sure when */}
        {/* <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Cambiar Ubicacion:</Text>
          <Pressable
            onPress={() => {
              alert(
                "map not yet ready, come back later and why don't you speed it up"
              )
            }}
          >
            <MapPinIcon color="#00CCBB" />
          </Pressable>
        </View> */}
      </View>

      <View className="mx-1">
        <Searchbar
          placeholder="Buscar con Nombre" // in the future will want to use ID number
          onChangeText={onChangeSearch}
          value={searchQuery}
          mode="bar"
        />
      </View>
    </View>
  )
}

export default HomeSearchHeader
