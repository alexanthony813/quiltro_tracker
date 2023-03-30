import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, SafeAreaView, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  ChevronDownIcon,
  MapIcon,
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
} from 'react-native-heroicons/outline'
import AmigoList from '../components/AmigoList'
import NewAmigoModal from '../components/NewAmigoModal'

/* UI notes
Crop photos? how to center on faces? should be ok when people can upload own photo but will need to center
*/

/* data model notes:
multiple owner ids? could be primary in the front end but need support on back end
multiple owner numbers
*/

const displayNameMap = {
  dog: 'Perros Identificados',
  cat: 'Gatos Identificados',
  miscellaneous: 'Varios Identificando',
  unidentified: 'No Identificado (con Avistamiento y Foto)',
}

const HomeScreen = () => {
  // const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [amigos, setAmigos] = useState([])

  const handleAddAmigoClick = () => {
    setIsModalVisible(true)
  }

  const categorizedAnimalsObject = amigos.reduce(
    (acc, curr) => {
      if (acc.hasOwnProperty(curr.species)) {
        acc[curr.species].push(curr)
      } else {
        acc.miscellaneous.push(curr)
      }
      return acc
    },
    {
      // this will control what rows we show and dynamically render otherwise
      dog: [],
      cat: [],
      miscellaneous: [],
      // unidentified: [], // non MVP, tracking amigos without posts
    }
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/amigos')
        const data = await response.json()
        setAmigos(data && Object.values(data))
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [JSON.stringify(amigos)])
  console.dir(amigos)
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row pb-3 items-center mt-4 ml-5 space-x-2 ">
        <UserIcon size={35} />
        <View>
          <Text className="font-bold text-sx">Ver Mascotas Perdidas</Text>
          <Text className="font-bold text-xl">
            Ubicacion Actual
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Puedes buscar en el mapa tambien:</Text>
          <MapIcon color="#00CCBB" />
        </View>
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Puedes agregar nuevo amigo:</Text>
          <Pressable onPress={handleAddAmigoClick}>
            <MagnifyingGlassPlusIcon color="#00CCBB" />
          </Pressable>
        </View>
        {/* <AdjustmentsVerticalIcon color="#00CCBB" /> */}
      </View>
      <NewAmigoModal
        isModalVisible={isModalVisible}
        closeModalHandler={setIsModalVisible}
        setAmigos={setAmigos}
        amigos={amigos}
      />

      {/* Category by species */}
      <View className="bg-gray-100">
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
              <AmigoList amigos={categorizedAnimalsObject[animalCategory]} />
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
