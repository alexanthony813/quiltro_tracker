import {
  Alert,
  Button,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default function App() {
  const handlePress = (e) => {
    console.log(e)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Do you like this picture?"
        color="orange"
        onPress={() =>
          Alert.prompt(
            'What do you see?',
            'Please type your response below',
            (text) => console.log(text)
          )
        }
      />
      <TouchableOpacity>
        <Image
          blurRadius={1}
          source={{
            uri: 'https://picsum.photos/200/300',
            height: 300,
            width: 200,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
