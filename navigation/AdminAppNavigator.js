import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosButton from '../components/MisAmigosButton'
import routes from './routes'
import MisAmigosScreen from '../screens/MisAmigosScreen'
import UserNavigator from './UserNavigator'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const MisAmigosStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const AdminAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Support"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MisAmigos"
        component={MisAmigosScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <MisAmigosButton
              onPress={(e) => {
                e.preventDefault()
                navigation.navigate({ name: routes.MIS_AMIGOS })
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AdminAppNavigator
