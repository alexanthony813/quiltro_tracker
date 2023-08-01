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
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBVL--mWCJkcg_pEX99smeNsyz6eOUI9o0',
  authDomain: 'quiltro-44098.firebaseapp.com',
  projectId: 'quiltro-44098',
  storageBucket: 'quiltro-44098.appspot.com',
  messagingSenderId: '1001073219155',
  appId: '1:1001073219155:web:e488be8d50bd308a18d8a6',
  measurementId: 'G-YB5KMHVM76',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export default function App(props) {
  const auth = getAuth()
  const [isReady, setIsReady] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const {
    data: quiltro,
    error: quiltroFetchError,
    isLoading,
    request: loadQuiltro,
  } = useApi(getQuiltro)

  useEffect(() => {
    async function asyncHelper() {
      // let user = await authStorage.getUser()
      // if (user) {
      // setUser(hardCodedUser)
      // }
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

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.dir(user)
      setUser(user)
    } else {
      // ...
    }
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TailwindProvider>
          {user || (quiltro && quiltro._id) ? (
            <AdminAppNavigator quiltro={quiltro} />
          ) : (
            <AdminAuthNavigator app={app} />
          )}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
