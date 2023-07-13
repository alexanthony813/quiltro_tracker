import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import Screen from '../components/Screen'
import { ListItem, ListItemSeparator } from '../components/lists'
import useNotifications from '../notifications/useNotifications'
import useApi from '../hooks/useApi'
import { getUserNotifications } from '../api/index'

function ConversationScreen() {
  const { conversationSenderId } = useNotifications()

  const {
    data: userNotifications,
    error,
    isLoading,
    request: loadUserNotifications,
  } = useApi(getUserNotifications)
  const [refreshing, setRefreshing] = useState(false)

  const conversationNotifications = userNotifications.filter((notification) => {
    return notification.senderId === conversationSenderId
  })

  return (
    <Screen>
      {conversationNotifications && conversationNotifications.length ? (
        <FlatList
          data={conversationNotifications}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ message }) => (
            <ListItem
              title={message.title}
              subTitle={message.description}
              image={message.image}
              onPress={() => {
                // navigationRef.navigate
              }}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
        />
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <Text>Aun no tienes notifications</Text>
        </View>
      )}
    </Screen>
  )
}

export default ConversationScreen
