import React, { useState, useRef, useEffect } from 'react'
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
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    let user = await authStorage.getUser()
    if (user) {
      setUser(user)
    }
  }

  const hardCodedUser = {
    userId: '645e7685c82a065dfe600c88',
    phoneNumber: 'oinkerman1',
  }

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
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TailwindProvider>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
