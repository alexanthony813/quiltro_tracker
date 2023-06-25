import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
// import AppLoading from 'expo-app-loading'
import 'setimmediate'
import * as Device from 'expo-device'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications'

import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './auth/context'
import authStorage from './auth/storage'
import { navigationRef } from './navigation/rootNavigation'
import {
  sendPushNotification,
  registerForPushNotificationsAsync,
} from './utility/notifications'

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
  console.dir(expoPushToken)
  console.dir('expoPushToken')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    async function asyncHelper() {
      const token = await registerForPushNotificationsAsync()
      console.dir(token)
      await setExpoPushToken(token)

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

  const restoreUser = async () => {
    let user = await authStorage.getUser()
    if (user) {
      setUser(user)
    }
  }
  const user = { userId: '645e7685c82a065dfe600c88', username: 'oinkerman1' }
  useEffect(() => {
    async function asyncHelper() {
      const token = await registerForPushNotificationsAsync()
      await setExpoPushToken(token)
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

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       onError={setError}
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //     />
  //   )
  // }

  // const messagingComponent = (
  //   <View className="flex justify-center align-center">
  //     <Text>FCM Basic POC</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // )

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
