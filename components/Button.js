import { Text, TouchableOpacity } from 'react-native'

import colors from '../config/colors'

function AppButton({
  styles,
  title,
  onPress,
  color = 'secondary',
  isDisabled,
  textStyles
}) {
  const validatedOnPress = isDisabled ? () => {} : onPress
  const backgroundColor = isDisabled ? 'gray' : colors[color] || 'medium'
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        height: '50%',
        marginVertical: 10,
        flex: 1,
        backgroundColor,
        ...styles,
      }}
      onPress={validatedOnPress}
    >
      <Text
        style={{
          color: colors.white,
          fontSize: 14,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          ...textStyles
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default AppButton
