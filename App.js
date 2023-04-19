import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './navigation/AuthNavigator'
import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <TailwindProvider>
        {/* todo update with auth */}
        {true ? <AppNavigator /> : <AuthNavigator />}
      </TailwindProvider>
    </NavigationContainer>
  )
}
