import settings from '../config/settings'

export const saveNewAmigo = async ({ amigo }) => {
  const response = await fetch(`${settings.apiUrl}/amigos`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      species: amigo.species,
      last_seen_address: amigo.lastSeenAddress,
      name: amigo.name,
      description: amigo.description,
      message: amigo.message,
      owner_number: amigo.ownerNumber,
      photo_url: amigo.photo_url,
    }),
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
