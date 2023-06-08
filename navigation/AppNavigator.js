import React, { useEffect } from 'react'
import HomeSearchScreen from '../screens/HomeSearchScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosButton from '../components/MisAmigosButton'
import routes from './routes'
import MisAmigosScreen from '../screens/MisAmigosScreen'
import UserNavigator from './UserNavigator'

const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Buscar"
        component={HomeSearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-search"
              size={size}
              color={color}
            />
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

export default AppNavigator
