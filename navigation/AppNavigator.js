import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosScreen from '../screens/MisAmigosScreen'
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
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Mis Amigos" component={MisAmigosScreen} />
    <Stack.Screen name="User" component={UserScreen} />
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
      name="Home"
      component={StackNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ListingEdit"
      component={MisAmigosScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <MisAmigosButton
            onPress={() => navigation.navigate(routes.LISTING_EDIT)}
          />
        ),
      })}
    />
    <Tab.Screen name="User" component={StackNavigator} />
  </Tab.Navigator>
)

export default AppNavigator
