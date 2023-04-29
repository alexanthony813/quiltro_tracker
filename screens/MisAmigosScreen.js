import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Button from '../components/Button'
import colors from '../config/colors'
import { getUserAmigos } from '../api/index'

import routes from '../navigation/routes'
import Screen from '../components/Screen'
import AppText from '../components/Text'
import useApi from '../hooks/useApi'
import { MapPinIcon } from 'react-native-heroicons/outline'
import NewAmigoModal from './NewAmigoModal'

function MisAmigosScreen({ navigation }) {
  const {
    data: amigos,
    error,
    isLoading,
    request: loadAmigos,
  } = useApi(getUserAmigos)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    loadAmigos({ userId: 1 })
  }, [JSON.stringify(amigos)])

  return (
    <Screen style={styles.screen}>
      <NewAmigoModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />

      {/* Header */}
      <View className="flex-row pb-3 items-center mt-4 ml-5 space-x-2 ">
        <Text>Mis Amigos</Text>
        <Button
          title="Agregar Nuevo"
          onPress={() => {
            setIsModalVisible(!isModalVisible)
          }}
        />
      </View>
      {error && (
        <>
          <AppText>Couldn't retrieve the amigos.</AppText>
          {/* <Button title="Retry" onPress={loadAmigos.request} /> */}
        </>
      )}
      <FlatList
        data={amigos}
        keyExtractor={(amigo) => amigo.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              overflow: 'hidden',
              marginHorizontal: 5,
              width: 300,
            }}
          >
            <Image
              source={{ uri: item.photo_url }}
              style={{ width: '100%', aspectRatio: 1 }}
            />

            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                {item.description}
              </Text>
              <Text style={{ fontSize: 12, color: '#808080' }}>
                {item.message}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MapPinIcon color="#808080" size={16} />
                <Text style={{ fontSize: 12, color: '#808080', marginLeft: 5 }}>
                  Visto por ultimo vez en {item.last_seen_address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
})

export default MisAmigosScreen
