import React from 'react'
import { View } from 'react-native'

import colors from '../../config/colors'

function ListItemSeparator() {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: colors.light,
      }}
    />
  )
}

export default ListItemSeparator
