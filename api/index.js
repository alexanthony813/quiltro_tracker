import settings from '../config/settings'

export const subscribeUserToQuiltro = async (uid, quiltroId) => {
  const response = await fetch(
    `${settings.apiUrl}/users/${uid}/quiltros/${quiltroId}`,
    {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )

  return response
}

export const saveNewQuiltro = async (quiltro) => {
  const response = await fetch(`${settings.apiUrl}/quiltros`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiltro),
  })

  return response
}

export const saveNewStatusEvent = async (statusEvent) => {
  const response = await fetch(
    `${settings.apiUrl}/quiltros/${statusEvent.quiltroId}/event`,
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

export const registerUser = async (user) => {
  return await fetch(`${settings.apiUrl}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
}

export const getUserMessages = async ({ uid }) => {
  return await fetch(`${settings.apiUrl}/users/${uid}/messages`)
}

export const getPresignedUrl = async () => {
  return await fetch(`${settings.apiUrl}/s3`)
}

export const getQuiltros = async () => {
  return await fetch(`${settings.apiUrl}/quiltros`)
}

export const getQuiltroEvents = async (quiltroId) => {
  return await fetch(`${settings.apiUrl}/quiltros/${quiltroId}/events`)
}

export const getEvents = async () => {
  return await fetch(`${settings.apiUrl}/events`)
}

export const getUserQuiltros = async ({ uid }) => {
  return await fetch(`${settings.apiUrl}/users/${uid}/quiltros`)
}

export const getQuiltro = async (quiltroId) => {
  return await fetch(`${settings.apiUrl}/quiltros/${quiltroId}`)
}

export const getUserNotifications = async ({ uid }) => {
  return await fetch(`${settings.apiUrl}/users/${uid}/messages`)
}
