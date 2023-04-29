import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '../screens/SettingsScreen'
import NotificationsScreen from '../screens/NotificationsScreen'

const Stack = createStackNavigator()

const UserNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Configuración" component={UserScreen} />
    <Stack.Screen name="Notificaciones" component={NotificationsScreen} />
  </Stack.Navigator>
)

export default UserNavigator
