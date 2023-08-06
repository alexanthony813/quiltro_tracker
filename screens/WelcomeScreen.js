import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

import Button from '../components/Button'
import routes from '../navigation/routes'

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      source={require('../assets/background.jpeg')}
    >
      <View style={styles.logoContainer}>
        {/* TODO add paw in place of logo */}
        <Text style={styles.tagline}>Tu puedes ayudar ahora!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login Anonimo"
          onPress={() => {
            const auth = getAuth()
            signInAnonymously(auth)
          }}
        />
        <Button
          title="Registrar como Adminstrativo"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
    color: 'white',
  },
})

export default WelcomeScreen
