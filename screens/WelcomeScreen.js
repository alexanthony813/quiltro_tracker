import React from 'react'
import { ImageBackground, View, Text } from 'react-native'
import { getAuth, signInAnonymously } from 'firebase/auth'

import Button from '../components/Button'
import routes from '../navigation/routes'

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={3}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
      source={require('../assets/background.jpeg')}
    >
      <View style={{
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  }}>
        {/* TODO add paw in place of logo */}
        <Text style={{
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
    color: 'white',
  }}>Tu puedes ayudar ahora!</Text>
      </View>
      <View style={{
    padding: 20,
    width: '100%',
  }}>
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

export default WelcomeScreen
