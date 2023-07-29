import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import 'setimmediate'
import navigationTheme from './navigation/navigationTheme'
import AuthContext from './auth/context'
import authStorage from './auth/storage'
import useApi from './hooks/useApi'
import { parseInitialURLAsync } from 'expo-linking'
import AdminAppNavigator from './navigation/AdminAppNavigator'
import AdminAuthNavigator from './navigation/AdminAuthNavigator'

const hardCodedUser = {
  phoneNumber: '109692896821923',
  joinedOn: '2023-07-18T18:06:01.481Z',
  _id: '64b6d489c059ac97b164e971',
  __v: 0,
}

import { navigationRef } from './navigation/rootNavigation'
import { getQuiltro } from './api'

export default function App(props) {
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const {
    data: quiltro,
    error: quiltroFetchError,
    isLoading,
    request: loadQuiltro,
  } = useApi(getQuiltro)

  const restoreUser = async () => {
    // let user = await authStorage.getUser()
    // if (user) {
    // setUser(hardCodedUser)
    // }
    try {
      const parsedUrl = await parseInitialURLAsync()
      const { path } = parsedUrl // TODO remember to reformat, assuming quiltroId from QR code
      if (path) {
        loadQuiltro({ path })
      }
    } catch (err) {
      console.dir(err)
      setError(error)
    }
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
          {quiltro ? (
            <AdminAppNavigator quiltro={quiltro} />
          ) : (
            <AdminAuthNavigator />
          )}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
