import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import { ListItem, ListItemSeparator } from '../components/lists'
import colors from '../config/colors'
import Icon from '../components/Icon'
import routes from '../navigation/routes'
import Screen from '../components/Screen'
import useAuth from '../auth/useAuth'

const menuItems = [
  {
    title: 'Mis Amigos',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MIS_AMIGOS,
  },
  {
    title: 'Mis Mensajes',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.NOTIFICATIONS,
  },
]

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth()

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem title={user.username} subTitle={user.password} />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
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
