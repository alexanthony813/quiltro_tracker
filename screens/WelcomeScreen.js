import React from 'react'
import { ImageBackground, View, Text } from 'react-native'
import { getAuth, signInAnonymously } from 'firebase/auth'

import Button from '../components/Button'
import routes from '../navigation/routes'
import { firebaseApp } from '../App'

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
      <View
        style={{
          bottom: '15%',
          alignItems: 'center',
          background: 'rgb(0, 0, 0, 0.5)',
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            paddingVertical: 20,
            color: 'white',
          }}
        >
          Tu puedes ayudar{' '}
          <Text style={{ textDecorationLine: 'underline' }}>ahora!</Text>
        </Text>
        <View
          style={{
            padding: 20,
            width: '100%',
          }}
        >
          <Button
            title="Login Anónimamente"
            onPress={() => {
              const auth = getAuth(firebaseApp)
              signInAnonymously(auth)
            }}
          />
          <Button
            title="Registrar como Adminstrativo"
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default WelcomeScreen
