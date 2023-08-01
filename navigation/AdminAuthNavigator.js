import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RegisterScreen from '../screens/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MisAmigosScreen from '../screens/MisAmigosScreen'

const Stack = createStackNavigator()

const AdminAuthNavigator = ({firebaseApp}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={MisAmigosScreen} />
    <Stack.Screen initialParams={{firebaseApp}} name="Register" component={RegisterScreen} />
  </Stack.Navigator>
)

export default AdminAuthNavigator
