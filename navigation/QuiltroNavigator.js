import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import QuiltroDetailsScreen from '../screens/QuiltroDetailsScreen'
import QuiltroReportScreen from '../screens/QuiltroReportScreen'
import routes from './routes'

const Stack = createStackNavigator()

const QuiltroNavigator = ({ route }) => {
  const { quiltro } = route.params

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routes.QUILTRO_DETAILS}
    >
      <Stack.Screen
        initialParams={{ quiltro }}
        name={routes.QUILTRO_DETAILS}
        component={QuiltroDetailsScreen}
      />
      <Stack.Screen
        initialParams={{ quiltro }}
        name={routes.QUILTRO_REPORT}
        component={QuiltroReportScreen}
      />
    </Stack.Navigator>
  )
}

export default QuiltroNavigator
