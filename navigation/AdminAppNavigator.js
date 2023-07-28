import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisAmigosButton from '../components/MisAmigosButton'
import routes from './routes'
import MisAmigosScreen from '../screens/MisAmigosScreen'
import UserNavigator from './UserNavigator'
import SupportNavigator from './SupportNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import AmigoDetailsScreen from '../screens/AmigoDetailsScreen'
 
const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const MisAmigosStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initalRouteName={routes.MIS_AMIGOS}
    >
      <Stack.Screen name={routes.AMIGO_LIST} component={MisAmigosScreen} />
      <Stack.Screen name={routes.AMIGO_DETAILS} component={AmigoDetailsScreen} />
    </Stack.Navigator>
  )
}

const AdminAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routes.MIS_AMIGOS}
    >
      <Tab.Screen
        name={routes.SUPPORT}
        component={SupportNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.MIS_AMIGOS}
        component={MisAmigosStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <MisAmigosButton
              onPress={(e) => {
                e.preventDefault()
                navigation.navigate(routes.MIS_AMIGOS)
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
