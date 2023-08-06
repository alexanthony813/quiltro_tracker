import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisQuiltrosButton from '../components/MisQuiltrosButton'
import routes from './routes'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'
import UserNavigator from './UserNavigator'
import SupportNavigator from './SupportNavigator'
import QuiltroNavigator from './QuiltroNavigator'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const MisQuiltrosStack = ({ route }) => {
  const { quiltro } = route.params
  const initialRouteName =
    quiltro && quiltro.quiltroId ? routes.QUILTRO_DETAILS : routes.QUILTRO_LIST
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={routes.QUILTRO_LIST} component={MisQuiltrosScreen} />
      <Stack.Screen
        initialParams={{ quiltro }}
        name={routes.QUILTRO}
        component={QuiltroNavigator}
      />
    </Stack.Navigator>
  )
}

// TODO rename, admin level will be specific to each quiltro
const AppNavigator = ({ quiltro }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routes.MIS_QUILTROS}
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
        name={routes.MIS_QUILTROS}
        component={MisQuiltrosStack}
        initialParams={{ quiltro }}
        options={({ navigation }) => ({
          tabBarIcon: ({ size, color }) => (
            <MisQuiltrosButton
              onPress={(e) => {
                e.preventDefault()
                navigation.navigate(routes.MIS_QUILTROS, {
                  screen: routes.QUILTRO_LIST,
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

export default AppNavigator
