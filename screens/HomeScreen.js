import React, { useLayoutEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserIcon } from 'react-native-heroicons/outline'

const pets = [
  {
    id: 1,
    species: 'dog',
    last_seen_address: 'Plaza Ñuñoa',
    home_address: 'Juan Moya Morales 22',
    name: 'Maggie',
    description: 'Shih Tzu mix, brown/white',
    estimated_date_of_birth: Date.now(),
    message:
      "I am lost! Please help me get home. I have all of my vaccines and I'm very friendly.",
    photo_url: 'https://images.pexels.com/photos/69372/pexels-photo-69372.jpeg', // S3 link,
    owner_id: 1,
    stray: false,
    outdoor_dog: false,
    details: {
      tags: {},
      events: {},
    },
  },
]

const HomeScreen = () => {
  const navigation = useNavigation()
  const isLoading = false

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'TESTING',
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      {/* Header */}
      <View className="text-red-500 flex-row pb-3 items-center mx-4 space-x-2 px-4">
        <UserIcon size={35} />
        <View>
          <Text className="font-bold text-sx">Ver Mascotas Perdidas</Text>
          <Text className="font-bold text-xl">Ubicacion Actual</Text>
        </View>
      </View>

      {/* Filters */}
      {/* <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
      </View> */}
      {/* <AdjustmentsVerticalIcon color="#00CCBB" /> */}

      {/* Dog List */}
      <View className="bg-gray-100 text-red-500">
        {isLoading ? (
          <DotIndicator />
        ) : (
          <FlatList
            data={pets}
            ListHeaderComponent={
              <View>
                <Text>List of Pets</Text>
              </View>
            }
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View>
                <View>
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                  <View>
                    <Text>{item.description}</Text>
                  </View>
                </View>
                <View>
                  <Image source={item.photo_url} />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
