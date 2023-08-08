import { View } from 'react-native'
import { ListItem } from './lists'
import Icon from '../components/Icon'

function QuiltroRequestList({ requestedItems }) {
  return (
    <View>
      {requestedItems.map((item) => {
        return (
          <ListItem
            title={item.title}
            IconComponent={
              <Icon name="gift" backgroundColor="rgb(252, 92, 101)" />
            }
            onPress={() => {}}
          />
        )
      })}
    </View>
  )
}

export default QuiltroRequestList
