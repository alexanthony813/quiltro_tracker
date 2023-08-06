import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisQuiltrosButton from '../components/MisQuiltrosButton'
import routes from './routes'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'
import UserNavigator from './UserNavigator'
import SupportNavigator from './SupportNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import QuiltroDetailsScreen from '../screens/QuiltroDetailsScreen'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const MisQuiltrosStack = ({ route }) => {
  const { quiltro } = route.params
  const initialRouteName =
    quiltro && quiltro.quiltroId ? routes.AMIGO_DETAILS : routes.AMIGO_LIST
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={routes.AMIGO_LIST} component={MisQuiltrosScreen} />
      <Stack.Screen
        initialParams={{ quiltro }}
        name={routes.AMIGO_DETAILS}
        component={QuiltroDetailsScreen}
      />
    </Stack.Navigator>
  )
}

// TODO rename, admin level will be specific to each quiltro
const AdminAppNavigator = ({ quiltro }) => {
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
        component={MisQuiltrosStack}
        initialParams={{ quiltro }}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <MisQuiltrosButton
              onPress={(e) => {
                e.preventDefault()
                navigation.navigate(routes.MIS_AMIGOS, {
                  screen: routes.AMIGO_LIST,
                })
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
