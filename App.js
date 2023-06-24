import React, { useState, useEffect } from 'react'
import firebase from '@react-native-firebase/app'
import { Alert } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import 'setimmediate'
import messaging from '@react-native-firebase/messaging'

import navigationTheme from './navigation/navigationTheme'
import AppNavigator from './navigation/AppNavigator'
import AuthNavigator from './navigation/AuthNavigator'
import AuthContext from './auth/context'
import authStorage from './auth/storage'
import { navigationRef } from './navigation/rootNavigation'
import { StatusBar } from 'expo-status-bar'

const RNfirebaseConfig = {
  apiKey: 'AIzaSyCVMiiEci8yVa-g40_by6Lf5s89BqL57jQ',
  authDomain: 'amigos-383614.firebaseapp.com',
  databaseURL: 'https://amigos-383614.firebaseio.com',
  projectId: 'amigos-383614',
  storageBucket: 'amigos-383614.appspot.com',
  messagingSenderId: '811603037043',
  appId: '1:811603037043:android:0756c38f512e5820531306',
}

// https://console.firebase.google.com/project/amigos-383614/overview
// TODO for ios

let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(RNfirebaseConfig)
} else {
  app = firebase.app()
}

const requestUserPermission = async () => {
  // this seems to be unnecessary
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const authStatus = await messaging().requestUserPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
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

    // messaging()
    //   .subscribeToTopic('amigos')
    //   .then(() => console.log('Subscribed to topic!'))

    // messaging()
    //   .unsubscribeFromTopic('amigos')
    //   .then(() => console.log('Unsubscribed fom the topic!'))

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
