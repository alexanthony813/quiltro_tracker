import React, { useEffect } from 'react'
import { View, SafeAreaView, ActivityIndicator } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import AmigoList from '../components/AmigoList'
import Text from '../components/Text'
import { getAmigos } from '../api'
import useLocation from '../hooks/useLocation'
import useApi from '../hooks/useApi'
import { ScrollView } from 'react-native-gesture-handler'
import HomeSearchHeader from '../components/HomeSearchHeader'

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

  useEffect(() => {
    loadAmigos()
  }, [JSON.stringify(amigos)])
  const currentLocation = useLocation()
  const categories = {
    dog: [],
    cat: [],
    miscellaneous: [],
  }

  const [searchQuery, setSearchQuery] = React.useState('')

  const onChangeSearch = (query) => setSearchQuery(query)

  const categorizedAnimalsObject = amigos
    ? amigos.reduce((acc, curr) => {
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
      }, categories)
    : categories

  return (
    <SafeAreaView>
      <HomeSearchHeader
        currentLocation={currentLocation}
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
      />

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
