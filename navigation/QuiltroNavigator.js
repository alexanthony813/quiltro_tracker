import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import QuiltroDetailsScreen from '../screens/QuiltroDetailsScreen'
import routes from './routes'

const Stack = createStackNavigator()

const QuiltroNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      initialParams={{ quiltro }}
      name={routes.QUILTRO_DETAILS}
      component={QuiltroDetailsScreen}
    />
    <Stack.Screen
      initialParams={{ quiltro }}
      name={routes.QUILTRO_DONATE}
      component={QuiltroDonateScreen}
    />
    <Stack.Screen
      initialParams={{ quiltro }}
      name={routes.QUILTRO_REPORT}
      component={QuiltroReportScreen}
    />
  </Stack.Navigator>
)

export default QuiltroNavigator
