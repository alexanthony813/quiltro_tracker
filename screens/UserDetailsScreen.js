import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, SafeAreaView, Pressable } from 'react-native'
// import { MapView } from 'react-native-maps'

const UserDetailsScreen = ({ navigation }) => {
  // const navigation = useNavigation()
  const [amigos, setAmigos] = useState([])

  return (
    <SafeAreaView>
      <Text>Here is where the map will go</Text>
      {/* <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
    </SafeAreaView>
  )
}

export default UserDetailsScreen
