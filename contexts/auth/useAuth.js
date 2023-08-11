import React, { useContext } from 'react'
import AuthContext from './context'

// greatly simplified by switching to firebase
const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)

  return { user, setUser }
}

export default useAuth
