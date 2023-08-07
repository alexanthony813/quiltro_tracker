import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'
import colors from '../config/colors'
import Text from '../components/Text'

function QuiltroDonateScreen({ route }) {
  const { quiltro } = route.params
  const { lastStatusEvent } = quiltro

  return (
    <Screen>
      <MisQuiltrosHeader
        quiltro={quiltro}
        setIsModalVisible={() => {
          setIsModalVisible(!isModalVisible)
        }}
      />
      <Image
        preview={{ uri: quiltro.photoUrl }}
        tint="light"
        uri={quiltro.photoUrl}
      />
      <View>
        <Text>Donar aqui</Text>
      </View>
    </Screen>
  )
}

export default QuiltroDonateScreen
