import React from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Text from '../components/Text'

function QuiltroDonateScreen({ route }) {
  const { quiltro } = route.params

  return (
    <Screen>
      <MisQuiltrosHeader
        quiltro={quiltro}
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
