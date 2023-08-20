import { View, TouchableWithoutFeedback } from 'react-native'
import { Image } from 'react-native-expo-image-cache'

import Text from './Text'
import colors from '../config/colors'

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: colors.white,
          marginBottom: 20,
          overflow: 'hidden',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 200,
          }}
          tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 7 }} numberOfLines={1}>
            {title}
          </Text>
          <Text
            style={{
              color: colors.secondary,
              fontWeight: 'bold',
            }}
            numberOfLines={2}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Card
