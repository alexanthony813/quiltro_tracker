import client from './client'

const login = (phone_number) => client.post('/auth', { phone_number })

export default {
  login,
}
