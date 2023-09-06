import { ImageBackground, View, Text } from 'react-native'
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
            title="Iniciar Sesión"
            onPress={() => navigation.navigate(routes.REGISTER)}

          />
          <Button
            title="Registrar como Administrador"
            color="secondary"
            onPress={() => navigation.navigate(routes.REGISTER)}
          />
        </View>
      </View>
    </ImageBackground>
  )
}

export default WelcomeScreen
