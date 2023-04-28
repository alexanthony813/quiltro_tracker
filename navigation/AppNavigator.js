import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosScreen from '../screens/NewAmigoScreen'
import MisAmigosButton from '../components/MisAmigosButton'
import routes from './routes'

const Stack = createNativeStackNavigator()

// TODO THREE TAB VIEWS: Search, Paw, User
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
      headerShown: false,
    }}
  >
    <Stack.Screen name="Buscar" component={HomeScreen} />
    <Stack.Screen name="Mis Amigos" component={MisAmigosScreen} />
    <Stack.Screen name="Configuracion" component={SettingsScreen} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Buscar"
      component={StackNavigator}
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
    <Tab.Screen name="User" component={StackNavigator} />
  </Tab.Navigator>
)

export default AppNavigator
