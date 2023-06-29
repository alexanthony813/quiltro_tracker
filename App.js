import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
// import AppLoading from 'expo-app-loading'
import 'setimmediate'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './auth/context'

import { navigationRef } from './navigation/rootNavigation'

// todo move all of this to api in new file and use to break up
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function App() {
  const [_, setUser] = useState()
  const [error, setError] = useState()
  // const [isReady, setIsReady] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  // const restoreUser = async () => {
  //   let user = await authStorage.getUser()
  //   if (user) {
  //     setUser(user)
  //   }
  // }
  const user = { expoPushToken: 'ExponentPushToken[ZODa4cP9q4KF75vId7ZnI0]', userId: '645e7685c82a065dfe600c88', username: 'oinkerman1' }
  useEffect(() => {
    async function asyncHelper() {
      const token = await Notifications.getExpoPushTokenAsync()
      console.dir(token)
      await setExpoPushToken(token.data)
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification)
        })

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response)
        })

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
    asyncHelper()
  }, [])
  
  // TODO figure way to track this before merge
  // set for hard coded user above doesn't work on web browser or emulator 
  console.dir(expoPushToken)
  user.expoPushToken = expoPushToken

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
