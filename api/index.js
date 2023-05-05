import settings from '../config/settings'

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

export const getPresignedUrl = async () => {
  return await fetch(`${settings.apiUrl}/s3`)
}

export const getAmigos = async () => {
    return await fetch(`${settings.apiUrl}/amigos`)
}

export const getAmigo = async (amigoId) => {
    return await fetch(`${settings.apiUrl}/amigos/${amigoId}`)
}

export const getUserAmigos = async ({ userId }) => {
    return await fetch(`${settings.apiUrl}/users/${userId}/amigos`)
}
