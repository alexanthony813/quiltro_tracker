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
      {userNotifications && userNotifications.length ? (
        <FlatList
          data={userNotifications}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.description}
              image={item.image}
              onPress={() => console.trace('Message selected', item)}
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
          <Text>Aun no tienes userNotifications</Text>
        </View>
      )}
    </Screen>
  )
}

export default NotificationsScreen
