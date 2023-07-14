import React, { useContext } from 'react'
import NotificationsContext from './context'

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(NotificationsContext)

  return { notifications, setNotifications }
}

export default useNotifications
