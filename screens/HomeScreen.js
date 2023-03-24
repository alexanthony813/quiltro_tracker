import React, { useLayoutEffect, useState } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  Pressable
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  LocationMarkerIcon,
  ChevronDownIcon,
  MapPinIcon,
  MapIcon,
  ArrowRightIcon,
  MagnifyingGlassPlusIcon,
} from 'react-native-heroicons/outline'
import AnimalList from '../components/AnimalList'
import NewFriendModal from '../components/NewFriendModal'

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
    message: '2,000,000 de recompensa!',
    photo_url: `https://amigosperdidos.s3.sa-east-1.amazonaws.com/chester_perro_2.jpg`,
    owner_id: 1,
    owner_number: '+56965832621',
    stray: false,
    outdoor_pet: false,
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
    message: 'Instagram @buscamosakali',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/kali_perro.jpg',
    owner_id: 2,
    owner_number: '+56961912271',
    stray: false,
    outdoor_pet: false,
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
    message: 'Se ofrece recompensa',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/maximo_perro.jpg',
    owner_id: 3,
    owner_number: '+56972739243',
    stray: false,
    outdoor_pet: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 4,
    species: 'parrot',
    last_seen_address: 'Plaza Egaña',
    name: 'Pingüin',
    description:
      'Cata, color celeste con marca en su nariz, puntos en el cuello',
    message: 'Recompensa! Ayuda para encontrar a nuestra catita australiana',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/pinguin_ave.jpg',
    owner_id: 4,
    owner_number: '+56986967889',
    stray: false,
    outdoor_pet: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 5,
    species: 'cat',
    last_seen_address: 'Carrera Pinto #1942',
    name: 'Nombre no es disponible',
    description: 'No tiene collar pero si tiene vacunas, es timida y cariñosa',
    message:
      'Necesitamos encontrarla, por favor cualquier noticia que vuela a casa',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/gato_anonimo_1.jpg',
    owner_id: 5,
    owner_number: '+56930945963',
    stray: false,
    outdoor_pet: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 6,
    species: 'cat',
    last_seen_address: 'Ñuñoa',
    name: 'Nombre no es disponible',
    description: 'Gatita perdida!',
    message: 'Gracias!!',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/gato_anonimo_2.jpg',
    owner_id: 6,
    owner_number: '+56965178500',
    stray: false,
    outdoor_pet: false,
    details: {
      additional_photos: [],
    },
  },
  {
    id: 7,
    species: 'parrot',
    last_seen_address: 'Plaza Egaña',
    name: 'Pingüin',
    description:
      'Cata, color celeste con marca en su nariz, puntos en el cuello',
    message: 'Recompensa! Ayuda para encontrar a nuestra catita australiana',
    photo_url:
      'https://amigosperdidos.s3.sa-east-1.amazonaws.com/pinguin_ave.jpg',
    owner_id: 7,
    owner_number: '+56986967889',
    stray: false,
    outdoor_pet: false,
    details: {
      additional_photos: [],
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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleAddFriendClick = () => {
    setIsModalVisible(true)
  }

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
      // unidentified: [], // non MVP, tracking animals without posts
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
        <View className="flex-row flex-1 space-x-2 p-3">
          <Text>Puedes agregar nuevo amigo:</Text>
          <Pressable onPress={handleAddFriendClick}>
            <MagnifyingGlassPlusIcon color="#00CCBB" />
          </Pressable>
        </View>
        {/* <AdjustmentsVerticalIcon color="#00CCBB" /> */}
      </View>
      <NewFriendModal isModalVisible={isModalVisible} closeModalHandler={setIsModalVisible} />

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

              <AnimalList animals={categorizedAnimalsObject[animalCategory]} />
            </View>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
