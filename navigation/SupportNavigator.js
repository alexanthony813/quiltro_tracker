import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '../screens/SettingsScreen'

const Stack = createStackNavigator()

const SupportNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Configuracion" component={UserScreen} />
  </Stack.Navigator>
)

export default SupportNavigator
