import { View, TextInput } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaultStyles from '../config/styles'

function AppTextInput({ icon, width = '100%', ...otherProps }) {
  return (
    <View style={[{
      backgroundColor: defaultStyles.colors.light,
      borderRadius: 25,
      flexDirection: 'row',
      padding: 15,
      marginVertical: 10,
    }, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={ {
            marginRight: 10,
          }}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  )
}

export default AppTextInput
