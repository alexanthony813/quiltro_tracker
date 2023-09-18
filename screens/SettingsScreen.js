import { View } from 'react-native'
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Screen from '../components/Screen'
import { signOut, getAuth } from 'firebase/auth'
import useAuth from '../contexts/auth/useAuth'
import { firebaseApp } from '../App'

function SettingsScreen() {
  const { user } = useAuth()
  const { phoneNumber } = user
  return (
    <Screen
      style={{
        backgroundColor: colors.light,
      }}
    >
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <ListItem title={phoneNumber || 'Anonimo'} />
        <ListItem
          title="Cerrar Sesión"
          IconComponent={
            <MaterialCommunityIcons name="logout" size={30} color="#ffe66d" />
          }
          onPress={async () => {
            const auth = getAuth(firebaseApp)
            await signOut(auth)
          }}
        />
      </View>
    </Screen>
  )
}

export default SettingsScreen
