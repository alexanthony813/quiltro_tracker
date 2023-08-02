import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'

import 'setimmediate'
import navigationTheme from './navigation/navigationTheme'
import useApi from './hooks/useApi'
import { parseInitialURLAsync } from 'expo-linking'
import AdminAppNavigator from './navigation/AdminAppNavigator'
import AdminAuthNavigator from './navigation/AdminAuthNavigator'
import AuthContext from './auth/context'
import { navigationRef } from './navigation/rootNavigation'
import { getQuiltro, registerUser } from './api'

import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import firebase from 'firebase/compat/app'

import firebaseConfig from './firebaseConfig' // Import the Firebase configuration

export let firebaseApp // TODO export
if (firebase && !firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

export default function App() {
  let auth
  const [user, setUser] = useState(null)
  try {
    auth = getAuth(firebaseApp)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.dir(user)
        setUser(user)
      } else {
        setUser(null)
      }
    })
  } catch (error) {
    console.dir(error)
  }
  // const [isReady, setIsReady] = useState(false) TODO
  const [error, setError] = useState(null)
  if (error) {
    console.error(error.message)
  }

  const {
    data: quiltro,
    error: quiltroFetchError,
    isLoading,
    request: loadQuiltro,
  } = useApi(getQuiltro)

  useEffect(() => {
    async function asyncHelper() {
      try {
        const parsedUrl = await parseInitialURLAsync()
        const { path } = parsedUrl // TODO remember to reformat, assuming quiltroId from QR code
        if (path) {
          await loadQuiltro(path)
          signInAnonymously(auth)
            .then(async ({ user }) => {
              registerUser(user)
            })
            .catch((error) => {
              setError(error)
            })
        }
      } catch (err) {
        console.dir(err)
        setError(quiltroFetchError)
      }
    }
    asyncHelper()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TailwindProvider>
          {user ? (
            <AdminAppNavigator quiltro={quiltro} />
          ) : (
            <AdminAuthNavigator />
          )}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
