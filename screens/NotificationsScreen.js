import React, { useState, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getUserNotifications } from '../api/index'

import useApi from '../hooks/useApi'
import Screen from '../components/Screen'
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../components/lists'
import useAuth from '../auth/useAuth'

function NotificationsScreen() {
  const {
    data: userNotifications,
    error,
    isLoading,
    request: loadUserNotifications,
  } = useApi(getUserNotifications)
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAuth()
  const { userId } = user
  useEffect(() => {
    loadUserNotifications({ userId })
  }, [JSON.stringify(userNotifications)])

  const handleDelete = (message) => {
    setNotifications(userNotifications.filter((m) => m.id !== message._id))
  }

  return (
    <Screen>
      {userConversations && userConversations.length ? (
        <FlatList
          data={userConversations}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(conversation) => conversation.senderId}
          renderItem={({ item: conversation }) => {
            return (
              <ListItem
                onPress={() => {
                  console.dir(conversation)
                  setNotifications(userNotifications)
                  navigation.navigate(routes.CONVERSATION, {
                    // screen: 'Conversation',
                    params: { conversationSenderId: conversation.senderId },
                  })
                  // navigation.navigate(routes.CONVERSATION)
                }}
                title={`Conversation with ${conversation.senderId}`}
              />
            )
          }}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
        />
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <Text>Aun no tienes notificationes</Text>
        </View>
      )}
    </Screen>
  )
}

export default NotificationsScreen
