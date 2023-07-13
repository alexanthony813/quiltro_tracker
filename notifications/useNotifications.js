import React, { useContext } from 'react'
import NotificationsContext from './context'

const useNotifications = () => {
  const { conversationSenderId, setConversationSenderId } = useContext(NotificationsContext)

  return { conversationSenderId, setConversationSenderId }
}

export default useNotifications
