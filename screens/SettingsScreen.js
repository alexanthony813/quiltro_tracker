import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

import { ListItem, ListItemSeparator } from '../components/lists'
import colors from '../config/colors'
import Icon from '../components/Icon'
import routes from '../navigation/routes'
import Screen from '../components/Screen'
import useAuth from '../auth/useAuth'

function AccountScreen({ navigation }) {
  const { user } = useAuth()
  console.dir(user)
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem title={user.phoneNumber} />
        <ListItem title={`Joined on: ${user.joinedOn}`} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
})

export default AccountScreen
