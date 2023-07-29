import settings from '../config/settings'

export const subscribeUserToAmigo = async (userId, quiltroId) => {
  const response = await fetch(
    `${settings.apiUrl}/users/${userId}/quiltros/${quiltroId}`,
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

export const loginUser = async (user) => {
  return await fetch(`${settings.apiUrl}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
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

export const getUserQuiltros = async ({ userId }) => {
  return await fetch(`${settings.apiUrl}/users/${userId}/quiltros`)
}

export const getQuiltro = async ({ quiltroId }) => {
  const response = await fetch(`${settings.apiUrl}/quiltros/${quiltroId}`)
  return response
}

export const getUserNotifications = async ({ userId }) => {
  return await fetch(`${settings.apiUrl}/users/${userId}/messages`)
}
