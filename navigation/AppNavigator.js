import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosButton from '../components/MisAmigosButton'
import routes from './routes'
import MisAmigosScreen from '../screens/MisAmigosScreen'
import UserNavigator from './UserNavigator'

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Buscar"
      // TODO do need to have navigator here???
      component={HomeScreen}
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

export default AppNavigator
