import React from 'react'
import Constants from 'expo-constants'
import { SafeAreaView, View } from 'react-native'

function Screen({ children, style }) {
  return (
      <SafeAreaView style={[{
        paddingTop: Constants.statusBarHeight,
        flex: 1,
      }, style]}>
        <View style={[{
    flex: 1,
  }, style]}>{children}</View>
      </SafeAreaView>
  )
}

export default Screen
