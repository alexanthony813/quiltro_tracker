import React, { useState, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getUserNotifications } from '../api/index'
import useAuth from '../auth/useAuth'
import useApi from '../hooks/useApi'
import Screen from '../components/Screen'
import { ListItem, ListItemSeparator } from '../components/lists'
import useNotifications from '../notifications/useNotifications'
import routes from '../navigation/routes'

function NotificationsScreen({ navigation }) {
  const { user, setUser } = useAuth()
  const { userId } = user
  const {
    data: userNotifications,
    error,
    isLoading,
    request: loadUserNotifications,
  } = useApi(getUserNotifications)
  const [refreshing, setRefreshing] = useState(false)
  const { setConversationSenderId } = useNotifications()

  useEffect(() => {
    loadUserNotifications({ userId })
  }, [userNotifications.length])

  const userConversations = !userNotifications.length
    ? []
    : Object.values(
        userNotifications.reduce((acc, curr) => {
          const senderId = curr.from
          if (acc.hasOwnProperty(senderId)) {
            acc[senderId]['messages'].push(curr)
          } else {
            acc[senderId] = { messages: [curr], senderId: senderId }
          }
          return acc
        }, {})
      )

  return (
    <Screen>
      {userConversations && userConversations.length ? (
        <FlatList
          data={userConversations}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(conversation) => conversation.senderId}
          renderItem={(conversation) => (
            <ListItem
              onPress={() => {
                // navigation.navigate('User', {
                //   screen: 'Conversation',
                //   params: { conversationSenderId: conversation.senderId },
                // })
                navigation.navigate(routes.CONVERSATION)
              }}
              title={`Conversation with ${conversation.senderId}`}
            />
          )}
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
