import { TouchableOpacity } from 'react-native'

import Text from './Text'

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{
    padding: 20,
  }}>{item.label}</Text>
    </TouchableOpacity>
  )
}

export default PickerItem
