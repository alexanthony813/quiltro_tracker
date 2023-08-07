import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'
import colors from '../config/colors'
import Text from '../components/Text'
import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'

function QuiltroDetailsScreen({ route }) {
  const { quiltro } = route.params
  const { lastStatusEvent } = quiltro
  const navigation = useNavigation()

  return (
    <Screen>
      <MisQuiltrosHeader
        quiltro={quiltro}
        setIsModalVisible={() => {
          setIsModalVisible(!isModalVisible)
        }}
      />
      <Image
        style={styles.image}
        preview={{ uri: quiltro.photoUrl }}
        tint="light"
        uri={quiltro.photoUrl}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{quiltro.name}</Text>
        <Text>{quiltro.favoriteFoods}</Text>
        <Text>{quiltro.cannotOrWontEat}</Text>
        <Text>{quiltro.location}</Text>
        <Text>{quiltro.requestedItems}</Text>
        {lastStatusEvent && (
          <View>
            <Text>{quiltro.lastSeenLocation}</Text>
            <Text>{quiltro.lastSeenDate}</Text>
          </View>
        )}
        <View>
          <Button
            color="primary"
            title="Seguir"
            onPress={() => {
              // TODO
            }}
          />
          <Button
            color="medium"
            title="Donar"
            onPress={() => {
              navigation.navigate(routes.QUILTRO_DONATE)
            }}
          />
          <Button
            color="secondary"
            title="Reportar Problema"
            onPress={() => {
              navigation.navigate(routes.QUILTRO_REPORT)
            }}
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
})

export default QuiltroDetailsScreen
