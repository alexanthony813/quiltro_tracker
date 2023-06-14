import React, { useEffect, useState, forwardRef } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import AmigoList from '../components/AmigoList'
import Text from '../components/Text'
import { getAmigos } from '../api'
import useLocation from '../hooks/useLocation'
import useApi from '../hooks/useApi'
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler'
import HomeSearchHeader from '../components/HomeSearchHeader'
import Screen from '../components/Screen'
import BottomSheet from '../components/BottomSheet'

const displayNameMap = {
  dog: 'Perros',
  cat: 'Gatos',
  miscellaneous: 'Varios',
}

const HomeSearchScreen = () => {
  const {
    data: amigos,
    error,
    isLoading,
    request: loadAmigos,
  } = useApi(getAmigos)

  useEffect(() => {
    loadAmigos()
  }, [JSON.stringify(amigos)])
  const currentLocation = useLocation()
  const amigosMap = {
    dog: [],
    cat: [],
    miscellaneous: [],
  }

  const [bottomSheetContentMode, setBottomSheetContentMode] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLostSelected, setIsLostSelected] = useState(true)
  const selectedStatus = isLostSelected ? 'lost' : 'found'
  const onChangeSearch = (query) => setSearchQuery(query)
  const categorizedAnimalsObject = amigos
    ? amigos.reduce((acc, curr) => {
        if (curr.status !== selectedStatus) {
          return acc
        }
        if (
          searchQuery !== '' &&
          curr.name &&
          curr.name.indexOf(searchQuery) === -1
        ) {
          return acc
        }
        if (acc.hasOwnProperty(curr.species)) {
          acc[curr.species].push(curr)
        } else {
          acc.miscellaneous.push(curr)
        }
        return acc
      }, amigosMap)
    : amigosMap

  return (
    <Screen>
      <HomeSearchHeader
        currentLocation={currentLocation}
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        setIsLostSelected={setIsLostSelected}
        isLostSelected={isLostSelected}
        setBottomSheetContentMode={setBottomSheetContentMode}
      />
      {/* Category by species */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-gray-100 flex"
          showsHorizontalScrollIndicator={false}
          // simultaneousHandlers={[panGestureRef]} uhhh i guess unnecessary ? TODO refactor bototm sheet component to include more (without breaking everything this time)
        >
          {Object.keys(categorizedAnimalsObject).map((animalCategory) => {
            const displayAnimalCategory = displayNameMap[animalCategory]

            return (
              <View key={animalCategory}>
                <View className="mt-4 flex-row items-center justify-between px-4">
                  <Text className="font-bold text-ig">
                    {displayAnimalCategory}
                  </Text>
                  <ActivityIndicator animating={isLoading} size="large" />
                  {/* this will show straight list, better than filters */}
                  <ArrowRightIcon color="#00CCBB" />
                </View>
                <AmigoList amigos={categorizedAnimalsObject[animalCategory]} />
              </View>
            )
          })}
        </ScrollView>
        {bottomSheetContentMode && (
          <BottomSheet
            bottomSheetContentMode={bottomSheetContentMode}
          />
        )}
      </GestureHandlerRootView>
    </Screen>
  )
}

export default HomeSearchScreen
