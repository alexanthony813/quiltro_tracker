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

const animals = [
  {
    id: 1,
    species: 'dog',
    last_seen_address: 'Plaza Ñuñoa',
    home_address: 'Juan Moya Morales 22',
    name: 'Maggie',
    description: 'Shih Tzu mix, brown/white',
    estimated_date_of_birth: Date.now(),
    message: "I have all of my vaccines and I'm very friendly.",
    photo_url: 'https://images.pexels.com/photos/69372/pexels-photo-69372.jpeg', // S3 link,
    owner_id: 1,
    stray: false,
    outdoor_dog: false,
    details: {
      tags: {},
      events: {},
    },
  },
  {
    id: 2,
    species: 'dog',
    last_seen_address: 'Plaza Ñuñoa',
    home_address: 'Juan Moya Morales 22',
    name: 'Sunile',
    description: 'Staffordshire, brown/white',
    estimated_date_of_birth: Date.now(),
    message: "I have all of my vaccines and I'm very friendly.",
    photo_url:
      'https://www.thesprucepets.com/thmb/-mrnsYDgFcB0eoMmxPaFq9vbBfc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/pitbull-dog-breeds-4843994-hero-db6922b6c8294b45b19c07aff5865790.jpg', // S3 link,
    owner_id: 1,
    stray: false,
    outdoor_dog: false,
    details: {
      tags: {},
      events: {},
    },
  },
  {
    id: 3,
    species: 'dog',
    last_seen_address: 'Plaza Ñuñoa',
    home_address: 'Juan Moya Morales 22',
    name: 'Kumar',
    description: 'Pitbull mix, brown/white',
    estimated_date_of_birth: Date.now(),
    message: "I have all of my vaccines and I'm very friendly.",
    photo_url:
      'https://www.thesprucepets.com/thmb/XsQOmrJIpSHNhuKykkcp5Wpr-Uk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AmericanStaffordshireTerrier-GettyImages-930740994-7d8a39011d0b41958d7bb02a44e899e5.jpg', // S3 link,
    owner_id: 1,
    stray: false,
    outdoor_dog: false,
    details: {
      tags: {},
      events: {},
    },
  },
  {
    id: 4,
    species: 'dog',
    last_seen_address: 'Walmart',
    home_address: 'Juan Moya Morales 22',
    name: 'Pitbull',
    description: 'Mr. 305!',
    estimated_date_of_birth: Date.now(),
    message: "I have all of my vaccines and I'm very friendly.",
    photo_url:
      'https://pbs.twimg.com/profile_images/1599878352222969869/1gVMpXnL_400x400.jpg', // S3 link,
    owner_id: 1,
    stray: false,
    outdoor_dog: false,
    details: {
      tags: {},
      events: {},
    },
  },
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
                          source={{ uri: item.photo_url}}
                          style={{ width: '100%', aspectRatio: 1 }}
                          className="w-36 h-36"
                        />

                        <View className="p-4">
                          <Text className="font-bold text-lg mb-1">
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
