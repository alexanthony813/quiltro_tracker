import React from 'react'
import routes from './routes'
import MisQuiltrosScreen from '../screens/MisQuiltrosScreen'
import NewQuiltroScreen from '../screens/NewQuiltroScreen'
import QuiltroNavigator from './QuiltroNavigator'
import { createStackNavigator } from '@react-navigation/stack'

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
      <Stack.Screen name={routes.NEW_QUILTRO} component={NewQuiltroScreen} />
      <Stack.Screen
        initialParams={{ quiltro }}
        name={routes.QUILTRO}
        component={QuiltroNavigator}
      />
    </Stack.Navigator>
  )
}

export default MisQuiltrosNavigator
