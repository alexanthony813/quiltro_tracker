import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'

function MisQuiltrosButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 20,
    height: 75,
    justifyContent: 'center',
    width: 75,
  }}>
        <MaterialCommunityIcons name="paw" color={colors.white} size={40} />
      </View>
    </TouchableOpacity>
  )
}

export default MisQuiltrosButton
