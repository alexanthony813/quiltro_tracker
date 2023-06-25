export const calculateDaysPassed = (startDate, endDate) => {
  // Convert the dates to UTC to ignore time zone differences
  const start = new Date(startDate.toISOString().split('T')[0])
  const end = new Date(endDate.toISOString().split('T')[0])

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end - start

  // Calculate the number of whole days by dividing milliseconds by the number of milliseconds in a day (24 hours)
  const daysPassed = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  )

  return daysPassed
}

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
export const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

export const registerForPushNotificationsAsync = async () => {
  let token
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}
