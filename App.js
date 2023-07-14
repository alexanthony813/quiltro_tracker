import React, { useState, useRef, useEffect } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'setimmediate'
import * as Notifications from 'expo-notifications'
import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './auth/context'
import NotificationsContext from './notifications/context'

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
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [expoPushToken, setExpoPushToken] = useState('')
  const notificationListener = useRef()
  const responseListener = useRef()

  // const restoreUser = async () => {
  //   let user = await authStorage.getUser()
  //   if (user) {
  //     setUser(user)
  //   }
  // }

  useEffect(() => {
    async function asyncHelper() {
      const token = await Notifications.getExpoPushTokenAsync()
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

  const hardCodedUser = {
    expoPushToken: 'ExponentPushToken[ZODa4cP9q4KF75vId7ZnI0]',
    userId: '645e7685c82a065dfe600c88',
    username: 'oinkerman1',
  }
  hardCodedUser.expoPushToken = expoPushToken

  return (
    <AuthContext.Provider
      value={{
        user: hardCodedUser,
        setUser: () => {
          setUser(hardCodedUser)
        },
      }}
    >
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <TailwindProvider>
          <NotificationsContext.Provider
            value={{ notifications, setNotifications }}
          >
            {hardCodedUser ? <AppNavigator /> : <AuthNavigator />}
          </NotificationsContext.Provider>
        </TailwindProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
