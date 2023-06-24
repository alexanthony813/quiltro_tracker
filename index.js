import { registerRootComponent } from 'expo'
// import messaging from '@react-native-firebase/messaging'
import App from './App'

// TODO
// messaging()
//   .getInitialNotification()
//   .then((remoteMessage) => {
//     if (remoteMessage) {
//       console.dir(
//         `Notification caused app to open from quit state: ${remoteMessage.notification}`
//       )
//       //  setInitialRoute(remoteMessage.date.type)  // not needed? test
//     }
//     // setLoading(false) // not needed? test
//   })

// messaging().onNotificationOpenedApp((remoteMessage) => {
//   console.log(
//     `Notification caused app to open from background state: ${remoteMessage.notification}`
//   )
//   // navigationRef.navigate(remoteMessage.data.type) // not needed? test
// })

// // Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage)
// })

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
