import { View } from 'react-native'
import { ListItem } from './lists'

function QuiltroRequestList({ quiltro }) {
  return (
    <View>
      {quiltro.requestedItems.map((item) => {
        ;<ListItem
          title={item.title}
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => {
            const auth = getAuth(firebaseApp)

            signOut(auth)
              .then((success) => {
                console.dir(success)
              })
              .catch((error) => {
                console.dir(error)
              })
          }}
        />
      })}
    </View>
  )
}

export default QuiltroRequestList
