import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import ListItem from '../components/lists/ListItem'
import MisAmigosHeader from '../components/MisAmigosHeader'

import colors from '../config/colors'
import Text from '../components/Text'

function AmigoDetailsScreen({ route }) {
  const { quiltro } = route.params
  const { lastStatusEvent } = quiltro

  return (
    <Screen>
      <MisAmigosHeader
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
        <View style={styles.userContainer}>
          <ListItem
            image={{ uri: quiltro.photoUrl }}
            title={`Quiero ayudar ${quiltro.name}`}
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

export default AmigoDetailsScreen
