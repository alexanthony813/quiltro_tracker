import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import 'setimmediate'

import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './auth/context'
import authStorage from './auth/storage'
import { navigationRef } from './navigation/rootNavigation'

export default function App() {
  const [_, setUser] = useState()
  const [error, setError] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    let user = await authStorage.getUser()
    if (user) {
      setUser(user)
    }
  }
  const user = { userId: '645e7685c82a065dfe600c88', username: 'oinkerman1' }
  if (!isReady) {
    return (
      <AppLoading
        onError={setError}
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TailwindProvider>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
