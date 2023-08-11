import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'

import 'setimmediate'
import navigationTheme from './navigation/navigationTheme'
import useApi from './hooks/useApi'
import { parseInitialURLAsync } from 'expo-linking'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './contexts/auth/context'
import QuiltroContext from './contexts/auth/context'
import OnboardingContext from './contexts/onboarding/context'
import { navigationRef } from './navigation/rootNavigation'
import { getQuiltroDetails, registerUser } from './api'

import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import firebase from 'firebase/compat/app'

import firebaseConfig from './firebaseConfig' // Import the Firebase configuration

export let firebaseApp // TODO export
if (firebase && !firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

export default function App() {
  let auth
  const [quiltro, setQuiltro] = useState(null)
  const [user, setUser] = useState(null)
  const [onboardingUser, setOnboardingUser] = useState(null) // createSwitchNavigator is gone...have to use a context when converting anon to account

  const {
    data: loadedQuiltro,
    error: quiltroFetchError,
    isLoading,
    request: loadQuiltro,
  } = useApi(getQuiltroDetails)

  try {
    auth = getAuth(firebaseApp)
    let isRegisteringUser = false
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // in retrospect might have been better to have admin collection but i'd rather duplicate the data then have it fragmented, using mongo as source of truth
        if (!user && !isRegisteringUser && !onboardingUser) {
          isRegisteringUser = true
          const registerUserResponse = await registerUser(firebaseUser) // better to have it in one place and get 409s, will return user
          const registerUserResponseJson = await registerUserResponse.json()
          setUser(registerUserResponseJson)
        }
      } else {
        setUser(null)
      }
    })
  } catch (error) {
    console.dir(error)
  }
  const [error, setError] = useState(null)
  if (error) {
    console.error(error.message)
  }

  useEffect(() => {
    async function asyncHelper() {
      try {
        const parsedUrl = await parseInitialURLAsync()
        const { path } = parsedUrl // TODO remember to reformat, assuming quiltroId from QR code
        if (path) {
          const loadedQuiltroResponse = await getQuiltroDetails(path) // TODO fix to use hook
          const loadedQuiltro = await loadedQuiltroResponse.json()
          console.dir(loadedQuiltro)
          setQuiltro(loadedQuiltro)
          signInAnonymously(auth)
        }
      } catch (err) {
        console.dir(err)
        setError(quiltroFetchError)
      }
    }
    asyncHelper()
  }, [])

  return (
    <QuiltroContext.Provider value={{ quiltro, setQuiltro }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <OnboardingContext.Provider
          value={{ onboardingUser, setOnboardingUser }}
        >
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <TailwindProvider>
              {user ? <AppNavigator quiltro={quiltro} /> : <AuthNavigator />}
            </TailwindProvider>
          </NavigationContainer>
        </OnboardingContext.Provider>
      </AuthContext.Provider>
    </QuiltroContext.Provider>
  )
}
