import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import colors from '../config/colors'
import Text from '../components/Text'
import ContactOwnerForm from '../components/ContactOwnerForm'

function AmigoDetailsScreen({ route }) {
  const amigo = route.params

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: amigo.photoUrl }}
        tint="light"
        uri={amigo.photoUrl}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{amigo.name}</Text>
        <Text>${amigo.age}</Text>
        <Text>${amigo.favoriteFoods}</Text>
        <Text>${amigo.cannotOrWontEat}</Text>
        <Text>${amigo.location}</Text>
        <View style={styles.userContainer}>
          <ListItem image={{ uri: amigo.photoUrl }} title={amigo.name} />
        </View>
        <ContactOwnerForm amigo={amigo} />
      </View>
    </KeyboardAvoidingView>
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
