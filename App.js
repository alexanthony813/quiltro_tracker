import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import 'setimmediate'
import navigationTheme from './navigation/navigationTheme'
import AdminNavigator from './navigation/AdminNavigator'
import AuthContext from './auth/context'
import authStorage from './auth/storage'

const hardCodedUser = {
  phoneNumber: '109692896821923',
  joinedOn: '2023-07-18T18:06:01.481Z',
  _id: '64b6d489c059ac97b164e971',
  __v: 0,
}

import { navigationRef } from './navigation/rootNavigation'

export default function App(props) {
  // console.dir(props.route.params)
  // const { quiltro_id } = this.props.route.params;
  // const isAdmin = quiltro_id === null
  const isAdmin = true
  const [user, setUser] = useState(null)

  const [error, setError] = useState(null)
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    // let user = await authStorage.getUser()
    // if (user) {
    setUser(hardCodedUser)
    // }
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
          {isAdmin ? <AdminNavigator /> : <UserNavigator />}
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
