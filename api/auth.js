import client from './client'

const login = (username, password) =>
  client.post('/auth', { username, password })

export default {
  login,
}
