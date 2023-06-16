import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

function AppButton({ styles, title, onPress, color = 'secondary', isDisabled }) {
  return (
    <TouchableOpacity
      style={{ ...styles, button: defaultStyles.button, backgroundColor: isDisabled? 'medium' : colors[color] }}
      onPress={onPress}
    >
      <Text style={defaultStyles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const defaultStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    height: '50%',
    marginVertical: 10,
    flex: 1,
  },
  text: {
    color: colors.white,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})

export default AppButton
