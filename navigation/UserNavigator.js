import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserScreen from '../screens/SettingsScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import ConversationScreen from '../screens/ConversationScreen'

const Stack = createStackNavigator()

const UserNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Configuracion" component={UserScreen} />
    <Stack.Screen name="Conversation" component={ConversationScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
)

export default UserNavigator
