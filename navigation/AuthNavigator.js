import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RegisterScreen from '../screens/RegisterScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'
import useOnboarding from '../contexts/onboarding/useOnboarding'
import routes from '../navigation/routes'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  const { onboardingUser } = useOnboarding()
  const initialRouteName = onboardingUser ? routes.REGISTER : routes.WELCOME
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={MisQuiltrosScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
