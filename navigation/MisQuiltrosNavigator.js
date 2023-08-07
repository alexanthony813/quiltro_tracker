import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MisQuiltrosButton from '../components/MisQuiltrosButton'
import routes from './routes'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'
import QuiltroNavigator from './QuiltroNavigator'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

const MisQuiltrosNavigator = ({ route }) => {
  const { quiltro } = route.params
  const initialRouteName =
    quiltro && quiltro.quiltroId ? routes.QUILTRO : routes.QUILTRO_LIST
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

export default MisQuiltrosNavigator
