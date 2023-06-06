import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import Screen from '../components/Screen'
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../components/lists'

function NotificationsScreen(props) {
  const [notifications, setNotifications] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const handleDelete = (message) => {
    setNotifications(notifications.filter((m) => m.id !== message.id))
  }

  return (
    <Screen>
      {notifications && notifications.length ? (
        <FlatList
          data={notifications}
          keyExtractor={(message) => message.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.image}
              onPress={() => console.log('Message selected', item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
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

export default NotificationsScreen
