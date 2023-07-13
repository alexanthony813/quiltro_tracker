import React, { useEffect, useState } from 'react'
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native'

import Button from '../components/Button'
import { getUserAmigos } from '../api/index'

import Screen from '../components/Screen'
import useApi from '../hooks/useApi'
import { MapPinIcon } from 'react-native-heroicons/outline'
import NewAmigoModal from '../components/NewAmigoModal'
import MisAmigosHeader from '../components/MisAmigosHeader'
import AuthContext from '../auth/context'
import colors from '../config/colors'
import useLocation from '../hooks/useLocation'

function MisAmigosScreen() {
  const userLocation = {} // useLocation()
  const { user, setUser } = React.useContext(AuthContext)
  const { userId } = user
  const {
    data: amigos,
    error,
    isLoading,
    request: loadAmigos,
  } = useApi(getUserAmigos)
  const [isModalVisible, setIsModalVisible] = useState(false)
  useEffect(() => {
    loadAmigos({ userId })
  }, [JSON.stringify(amigos)])

  return (
    <Screen>
      <NewAmigoModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        user={user}
        userLocation={userLocation}
      />

      <MisAmigosHeader
        setIsModalVisible={() => {
          setIsModalVisible(!isModalVisible)
        }}
      />
      {amigos && amigos.length ? (
        <FlatList
          data={amigos}
          className="align-center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(amigo) => amigo._id.toString()}
          renderamigo={({ amigo }) => (
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                overflow: 'hidden',
                marginHorizontal: 5,
                width: '100%',
                marginBottom: 30,
              }}
            >
              <Image
                source={{ uri: amigo.photo_url }}
                style={{ width: '100%', aspectRatio: 1 }}
              />

              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {amigo.name}
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }}>
                  {amigo.description}
                </Text>
                <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
                  {amigo.body}
                </Text>

                <View style={{ flexDirection: 'row', alignamigos: 'center' }}>
                  <MapPinIcon color={colors[colors.icon]} size={16} />
                  {amigo.last_status_event &&
                    amigo.last_status_event.status === 'sighted' && (
                      <View>
                        <Button title="Confirm"></Button>
                        <Text>
                          Visto hace {daysElapsedSinceLastSeen} dias!!
                        </Text>
                      </View>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : null}

      {!amigos || !amigos.length ? (
        <View className="flex h-full">
          <View className={'flex flex-1 justify-center amigos-center'}>
            <Text className={'text-center text-xl font-bold italic'}>
              No has agregado amigos perdidos, usa el botón para crear anuncio
            </Text>
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

export default MisAmigosScreen
