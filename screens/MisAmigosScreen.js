import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Button from '../components/Button'
import colors from '../config/colors'
import { getUserAmigos } from '../api/index'

import AmigoList from '../components/AmigoList'
import Screen from '../components/Screen'
import AppText from '../components/Text'
import useApi from '../hooks/useApi'
import { MapPinIcon } from 'react-native-heroicons/outline'
import NewAmigoModal from './NewAmigoModal'
import AuthContext from '../auth/context'

// return (
//   <SafeAreaView>
//     <Text>Here is where the add/check user amigos will go</Text>
//     <Text>Important to note, we will show this by default if any exists</Text>
//     <Text>Important to note, if button pressed it will automatically open the new modal</Text>
//   </SafeAreaView>
// )
function MisAmigosScreen() {
  // const { user } = props
  const { user, setUser } = React.useContext(AuthContext)
  const { userId } = user
  const {
    data: amigos,
    error,
    isLoading,
    request: loadAmigos,
  } = useApi(getUserAmigos)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    loadAmigos({ userId })
  }, [JSON.stringify(amigos)])

  return (
    <Screen style={styles.screen}>
      <NewAmigoModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        user={user}
      />

<Text className="font-bold text-xl text-center">Mis Amigos</Text>


      <AmigoList showAllDetails={true} amigos={amigos} />


      {error && (
        <>
          <AppText>Couldn't retrieve the amigos.</AppText>
          {/* <Button title="Retry" onPress={loadAmigos.request} /> */}
        </>
      )}
            {/* Header */}
      <View className="flex-row pb-3 items-center mt-4 ml-5 space-x-2 ">
        <Button
          title="Agregar Nuevo"
          onPress={() => {
            setIsModalVisible(!isModalVisible)
          }}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
})

export default MisAmigosScreen
