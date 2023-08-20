import { useEffect } from 'react'
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native'

import { getUserQuiltros } from '../api/index'

import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import QuiltroDetails from '../components/QuiltroDetails'
import { PlusCircleIcon } from 'react-native-heroicons/outline'
import routes from '../navigation/routes'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import useAuth from '../contexts/auth/useAuth'

function MisQuiltrosScreen({}) {
  const { user } = useAuth()
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { uid, isAdmin } = user
  const {
    data: quiltros,
    error,
    isLoading,
    request: loadQuiltros,
  } = useApi(getUserQuiltros)

  useEffect(() => {
    loadQuiltros({ uid })
  }, [JSON.stringify(quiltros), isFocused])

  return (
    <Screen>
      <MisQuiltrosHeader user={user} />
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
                No has agregado tus perros, usa el botón
                <Pressable
                  onPress={() => {
                    navigation.navigate(routes.NEW_QUILTRO)
                  }}
                  style={{
                    bottom: '-0.3em',
                    paddingLeft: '0.2em',
                    paddingRight: '0.2em',
                  }}
                >
                  <PlusCircleIcon color="#00CCBB" />
                </Pressable>
                para crear anuncio
              </Text>
            ) : (
              <Text className={'text-center text-xl font-bold italic'}>
                Necesitas seguir mas perros en las casitas! Escanear un codigo QR para
                empezar
              </Text>
            )}
          </View>
        </View>
      ) : null}
    </Screen>
  )
}

export default MisQuiltrosScreen
