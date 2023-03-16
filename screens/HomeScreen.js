import React, { useLayoutEffect } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  LocationMarkerIcon,
  ChevronDownIcon,
  MapPinIcon,
  MapIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/outline'
import AnimalList from '../components/AnimalList'

/* UI notes
Crop photos? how to center on faces? should be ok when people can upload own photo but will need to center
*/

/* data model notes:
multiple owner ids? could be primary in the front end but need support on back end
multiple owner numbers
*/
const animals = [
  {
    id: 1,
    species: 'dog',
    last_seen_address: 'Ñuñoa, y visto en Grecia/Quilin',
    name: 'Chester',
    description: 'Mestizo, con collar',
    message: "2,000,000 de recompensa!",
    photo_url: `https://amigosperdidos.s3.sa-east-1.amazonaws.com/chester_perro_2.jpg`,
    owner_id: 1,
    owner_number: '+56965832621',
    stray: false,
    outdoor_dog: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 2,
    species: 'dog',
    last_seen_address: 'Av. Las Condes con Padre Hurta',
    name: 'Kali',
    description: 'Chihuahua adoptada, esterilizada y con chip',
    message: "Instagram @buscamosakali",
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/kali_perro.jpg',
    owner_id: 2,
    owner_number: '+56961912271',
    stray: false,
    outdoor_dog: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 3,
    species: 'dog',
    last_seen_address: 'Ñuñoa',
    name: 'Maximo',
    description: 'Perro mediano color dorado y blanco raza mix',
    message: "Se ofrece recompensa",
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/maximo_perro.jpg',
    owner_id: 3,
    owner_number: '+56972739243',
    stray: false,
    outdoor_dog: false,
    details: {
      additional_photos: [],
    },
  }
]

const displayNameMap = {
  dog: 'Perros Identificados',
  cat: 'Gatos Identificados',
  miscellaneous: 'Varios Identificando',
  unidentified: 'No Identificado (con Avistamiento y Foto)',
}

const HomeScreen = () => {
  const navigation = useNavigation()
  const isLoading = false
  const categorizedAnimalsObject = animals.reduce(
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
      unidentified: [], // this will be used until the map-centric quiltro view is ready
    }
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'TESTING',
      headerShown: false,
    })
  }, [])

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
        {/* <AdjustmentsVerticalIcon color="#00CCBB" /> */}
      </View>

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

              <FlatList
                data={categorizedAnimalsObject[animalCategory]}
                horizontal={true}
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  paddingTop: 10,
                }}
                showsHorizontalScrollIndicator={false}
                className="flex-row pt-4"
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => {
                  if (item && item.name) {
                    return (
                      //animal card
                      <TouchableOpacity className="bg-white shadow rounded-lg overflow-hidden m-2 ">
                        <Image
                          source={{ uri: item.photo_url }}
                          style={{ width: '100%', aspectRatio: 1 }}
                          className="w-36 h-36"
                        />

                        <View className="p-4">
                          <Text className="font-bold text-lg pt-2 mb-1">
                            {item.name}
                          </Text>
                          <Text className="text-sm mb-2">
                            {item.description}
                          </Text>
                          <Text className="text-xs text-gray-500 mb-2">
                            {item.message}
                          </Text>

                          <View className="flex items-center space-x-2">
                            <MapPinIcon color="gray" opacity={0.4} size={24} />
                            <Text className="text-xs text-gray-500">
                              Visto por ultimo vez en{' '}
                              <Text>{item.last_seen_address}</Text>
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                }}
              />
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
