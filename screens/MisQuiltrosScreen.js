import React, { useEffect, useState } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'

import Button from '../components/Button'
import { getUserQuiltros } from '../api/index'

import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import NewQuiltroModal from '../components/NewQuiltroModal'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import colors from '../config/colors'
import QuiltroDetails from '../components/QuiltroDetails'
import { PlusCircleIcon } from 'react-native-heroicons/outline'
import routes from '../navigation/routes'
import { useNavigation, useRoute } from '@react-navigation/native'
import useAuth from '../contexts/auth/useAuth'

function MisQuiltrosScreen({}) {
  const { user } = useAuth()
  const currentUserLocation = {} // useUserLocation()
  const navigation = useNavigation()
  const route = useRoute()
  const { uid, isAdmin } = user
  const {
    data: quiltros,
    error,
    isLoading,
    request: loadQuiltros,
  } = useApi(getUserQuiltros)
  const [isModalVisible, setIsModalVisible] = useState(false)
  console.dir('rerenderd')
  useEffect(() => {
    loadQuiltros({ uid })
    console.dir('loading quiltros')
  }, [JSON.stringify(quiltros), isModalVisible, route])

  return (
    <Screen>
      <NewQuiltroModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        user={user}
        currentUserLocation={currentUserLocation}
      />

      <MisQuiltrosHeader
        setIsModalVisible={() => {
          setIsModalVisible(!isModalVisible)
        }}
        user={user}
      />
      {quiltros && quiltros.length ? (
        <FlatList
          data={quiltros}
          className="align-center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(quiltro) => quiltro.quiltroId.toString()}
          renderItem={({ item: quiltro }) => (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                overflow: 'hidden',
                marginLeft: '2.5%',
                width: '95%',
                marginBottom: 30,
              }}
              onPress={(e) => {
                e.preventDefault()
                navigation.navigate(routes.QUILTRO, {
                  quiltro,
                })
              }}
            >
              <Image
                source={{ uri: quiltro.photoUrl }}
                style={{ width: '100%', aspectRatio: 1 }}
              />

              <QuiltroDetails quiltro={quiltro} />
            </TouchableOpacity>
          )}
        />
      ) : null}

      {!quiltros || !quiltros.length ? (
        <View className="flex h-full">
          <View className={'flex flex-1 justify-center quiltros-center'}>
            {isAdmin ? (
              <Text className={'text-center text-xl font-bold italic'}>
                No has agregado quiltros perdidos, usa el botón
                <PlusCircleIcon color="#00CCBB" />
                para crear anuncio
              </Text>
            ) : (
              <Text className={'text-center text-xl font-bold italic'}>
                Necesitas seguir mas quiltros!
              </Text>
            )}
          </View>
          <View className="flex">
            <Button
              title="Agregar Nuevo"
              className="w-50%"
              onPress={() => {
                setIsModalVisible(!isModalVisible)
              }}
            />
          </View>
        </View>
      ) : null}
    </Screen>
  )
}

export default MisQuiltrosScreen
