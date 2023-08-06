import React, { useEffect, useState } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'

import Button from '../components/Button'
import { getUserQuiltros } from '../api/index'

import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import NewQuiltroModal from '../components/NewQuiltroModal'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import colors from '../config/colors'
import useLocation from '../hooks/useLocation'
import { PlusCircleIcon } from 'react-native-heroicons/outline'
import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../contexts/auth/useAuth'

function MisQuiltrosScreen({}) {
  const { user } = useAuth()
  const currentUserLocation = {} // useLocation()
  const navigation = useNavigation()

  const { uid, isAdmin } = user
  const {
    data: quiltros,
    error,
    isLoading,
    request: loadQuiltros,
  } = useApi(getUserQuiltros)
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    loadQuiltros({ uid })
    console.dir('loading quiltros')
  }, [JSON.stringify(quiltros), isModalVisible])
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
                marginHorizontal: 5,
                width: '100%',
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
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  Me llama {quiltro.name}
                </Text>
                <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
                  Prefiero comer {quiltro.favoriteFoods}
                </Text>
                <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
                  No puedo comer {quiltro.cannotOrWontEat}
                </Text>
                <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
                  Vivo en {quiltro.location}
                </Text>

                <View style={{ flexDirection: 'row', alignquiltros: 'center' }}>
                  {/* <MapPinIcon color={colors[colors.icon]} size={16} /> */}
                </View>
              </View>
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
