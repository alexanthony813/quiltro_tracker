import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '../screens/SettingsScreen'

const Stack = createStackNavigator()

const UserNavigator = () => (
  <Stack.Navigator options={{ headerShown: false }}>
    <Stack.Screen name="Configuración" component={UserScreen} />
  </Stack.Navigator>
)

export default UserNavigator
