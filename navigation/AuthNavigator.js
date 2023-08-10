import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RegisterScreen from '../screens/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'

const Stack = createStackNavigator()

const AuthNavigator = ({ firebaseApp }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={MisQuiltrosScreen} />
    <Stack.Screen
      initialParams={{ firebaseApp }}
      name="Register"
      component={RegisterScreen}
    />
  </Stack.Navigator>
)

export default AuthNavigator
