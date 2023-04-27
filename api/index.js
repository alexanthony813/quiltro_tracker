export const saveNewAmigo = async ({ amigo }) => {
  const response = await fetch('http://localhost:3000/amigos', {
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
  return await fetch('http://localhost:3000/s3')
}

export const getAmigos = async () => {
    return await fetch('http://localhost:3000/amigos')
}
