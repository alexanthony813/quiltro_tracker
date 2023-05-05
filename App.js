import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

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
  console.log(user)
  const user = { userId: "6453b61f4a2ba99c25bd8664", username: "oinkerman6" }
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
          {/* todo update with auth */}
          {user ? <AppNavigator /> : <AuthNavigator />}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
