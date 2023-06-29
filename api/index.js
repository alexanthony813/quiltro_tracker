import settings from '../config/settings'
// import * as Notifications from 'expo-notifications'

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
export const sendPushNotification = async (message) => {
  const { title, body, to } = message
  const expo_message = {
    sound: 'default',
    title,
    body,
    to,
    data: {},
  }
  message.expo_message = expo_message

  // TODO I'm not sure if this is needed anymore? if doing on the server too...
  // await Notifications.scheduleNotificationAsync({
  //   content: {
  //     title,
  //     body,
  //     data
  //   },
  //   trigger: { seconds: 2 },
  // })

  // await Notifications.scheduleNotificationAsync({
  //   content: expo_message,
  //   trigger: { seconds: 2 },
  // })

  const response = await fetch(`${settings.apiUrl}/messages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
  return response
}

export const saveNewAmigo = async (amigo) => {
  const response = await fetch(`${settings.apiUrl}/amigos`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(amigo),
  })

  return response
}

export const saveNewStatusEvent = async (statusEvent) => {
  const response = await fetch(
    `${settings.apiUrl}/amigos/${statusEvent.amigoId}/event`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statusEvent),
    }
  )
  return response
}

export const getUserMessages = async ({ userId }) => {
  return await fetch(`${settings.apiUrl}/users/${userId}/messages`)
}

export const getPresignedUrl = async () => {
  return await fetch(`${settings.apiUrl}/s3`)
}

export const getAmigos = async () => {
  return await fetch(`${settings.apiUrl}/amigos`)
}

export const getAmigoEvents = async (amigoId) => {
  return await fetch(`${settings.apiUrl}/amigos/${amigoId}/events`)
}

export const getEvents = async () => {
  return await fetch(`${settings.apiUrl}/events`)
}

export const getAmigo = async (amigoId) => {
  return await fetch(`${settings.apiUrl}/amigos/${amigoId}`)
}

export const getUserAmigos = async ({ userId }) => {
  return await fetch(`${settings.apiUrl}/users/${userId}/amigos`)
}
