import React from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Text from './Text'
import colors from '../config/colors'

// todo delete
function ListItem({ title, subTitle, image, IconComponent, onPress }) {
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          padding: 15,
          backgroundColor: colors.white,
        }}
      >
        {IconComponent}
        {image && (
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
            }}
            source={image}
          />
        )}
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: '500',
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subTitle && (
            <Text
              style={{
                color: colors.medium,
              }}
              numberOfLines={2}
            >
              {subTitle}
            </Text>
          )}
        </View>
        <MaterialCommunityIcons
          color={colors.medium}
          name="chevron-right"
          size={25}
        />
      </View>
    </TouchableHighlight>
  )
}

export default ListItem
