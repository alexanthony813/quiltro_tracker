import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
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
import { StatusBar } from 'expo-status-bar'

const requestUserPermission = async () => {
  const authStatus = await messaging().requestUserPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  console.dir(authStatus)
}

export default function App() {
  const [_, setUser] = useState()
  const [error, setError] = useState()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (requestUserPermission()) {
      // return token
      messaging()
        .getToken()
        .then((token) => {
          console.dir(token)
        })
    } else {
      console.dir(`Failed token status ${authStatus}`)
    }

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.dir(
            `Notification caused app to open from quit state: ${remoteMessage.notification}`
          )
          //  setInitialRoute(remoteMessage.date.type)  // not needed? test
        }
        // setLoading(false) // not needed? test
      })

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        `Notification caused app to open from background state: ${remoteMessage.notification}`
      )
      // navigationRef.navigate(remoteMessage.data.type) // not needed? test
    })

    messaging().setBackgroundMessageHandler((remoteMessage) => {
      console.dir(`Message handled in the background! ${remoteMessage}`)
    })

    const unsubscribe = messaging().onMessage((remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  const restoreUser = async () => {
    let user = await authStorage.getUser()
    if (user) {
      setUser(user)
    }
  }
  const user = { userId: '645e7685c82a065dfe600c88', username: 'oinkerman1' }
  if (!isReady) {
    return (
      <AppLoading
        onError={setError}
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  const messagingComponent = (
    <View className="flex justify-center align-center">
      <Text>FCM Basic POC</Text>
      <StatusBar style="auto" />
    </View>
  )

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
