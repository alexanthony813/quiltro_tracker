import { useState, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'setimmediate'
import navigationTheme from './navigation/navigationTheme'
import useApi from './hooks/useApi'
import { parseInitialURLAsync } from 'expo-linking'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './contexts/auth/context'
import QuiltroContext from './contexts/quiltro/context'
import OnboardingContext from './contexts/onboarding/context'
import { navigationRef } from './navigation/rootNavigation'
import { getQuiltroDetails, registerUser } from './api'

import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import firebase from 'firebase/compat/app'

import firebaseConfig from './firebaseConfig' // Import the Firebase configuration

export let firebaseApp
if (firebase && !firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig)
}

export default function App() {
  let auth
  const [quiltro, setQuiltro] = useState(null)
  const [user, setUser] = useState(null)
  const [onboardingUser, setOnboardingUser] = useState(null) // createSwitchNavigator is gone...have to use a context when converting anon to account
  const [pendingAdoptionInquiryQuiltro, setPendingAdoptionInquiryQuiltro] =
    useState(null) // createSwitchNavigator is gone...have to use a context when converting anon to account
  const [error, setError] = useState(null)
  const [isRegisteringUser, setIsRegisteringUser] = useState(false)

  const {
    data: loadedQuiltro,
    error: quiltroFetchError,
    isLoading,
    request: loadQuiltro,
  } = useApi(getQuiltroDetails)

  if (error) {
    console.error(error.message)
  }

  useEffect(() => {
    async function asyncHelper() {
      try {
        auth = getAuth(firebaseApp)
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            if (!user && !isRegisteringUser && !onboardingUser) {
              setIsRegisteringUser(true)
              const registerUserResponse = await registerUser(firebaseUser) // returns 201 with user if exists
              const registerUserResponseJson = await registerUserResponse.json()
              setUser(registerUserResponseJson)
            }
          } else {
            setUser(null)
          }
        })

        const parsedUrl = await parseInitialURLAsync()
        const { path } = parsedUrl
        if (path) {
          const loadedQuiltroResponse = await getQuiltroDetails(path) // TODO use hook
          const loadedQuiltro = await loadedQuiltroResponse.json()
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
          value={{
            onboardingUser,
            setOnboardingUser,
            pendingAdoptionInquiryQuiltro,
            setPendingAdoptionInquiryQuiltro,
          }}
        >
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <TailwindProvider>
              {user ? (
                <AppNavigator user={user} quiltro={quiltro} />
              ) : (
                <AuthNavigator />
              )}
            </TailwindProvider>
          </NavigationContainer>
        </OnboardingContext.Provider>
      </AuthContext.Provider>
    </QuiltroContext.Provider>
  )
}
