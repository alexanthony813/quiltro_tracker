import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisQuiltrosButton from '../components/MisQuiltrosButton'
import routes from './routes'
import UserNavigator from './UserNavigator'
import SupportNavigator from './SupportNavigator'
import MisQuiltrosNavigator from './MisQuiltrosNavigator'

const Tab = createBottomTabNavigator()

// TODO rename, admin level will be specific to each quiltro
const AppNavigator = ({ quiltro, setQuiltro }) => {
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
            <MaterialCommunityIcons name="message" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.MIS_QUILTROS}
        component={MisQuiltrosNavigator}
        initialParams={{ quiltro, setQuiltro }}
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
