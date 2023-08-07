import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ListItem } from '../components/lists'
import colors from '../config/colors'
import Icon from '../components/Icon'
import Screen from '../components/Screen'
import { signOut, getAuth } from 'firebase/auth'
import useAuth from '../contexts/auth/useAuth'
import { firebaseApp } from '../App'

function SettingsScreen() {
  const { user } = useAuth()
  const { phoneNumber } = user
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem title={phoneNumber || 'Anonimo'} />
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => {
            const auth = getAuth(firebaseApp)

            signOut(auth)
              .then((success) => {
                console.dir(success)
              })
              .catch((error) => {
                console.dir(error)
              })
          }}
        />
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

export default SettingsScreen
