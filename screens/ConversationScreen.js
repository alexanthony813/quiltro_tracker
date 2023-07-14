import React, { useState, useRef } from 'react'
import { FlatList, View, Text, Alert } from 'react-native'
import Screen from '../components/Screen'
import useNotifications from '../notifications/useNotifications'
import useAuth from '../auth/useAuth'
import { Form, FormField, SubmitButton } from '../components/forms'
import Button from '../components/Button'
import { sendNotification } from '../api'

function ConversationScreen(props) {
  //   const dummyScrollRef = useRef()
  const [formValue, setFormValue] = useState('')
  const { notifications, setNotifications } = useNotifications()
  const [refreshing, setRefreshing] = useState(false)
  const { conversationSenderId } = props.route.params
  const { user } = useAuth()
  const conversationNotifications = notifications.filter((notification) => {
    return notification.senderId === conversationSenderId
  })

  // TODO form might be too complicated..not sure if we want to add other fields and make more like email with title/attachments given how few will be sent, this isn't a chat app!
  const sendMessage = async ({ messageBody }) => {
    if (!messageBody) {
      Alert.alert('Escribir algo', 'Escribir algo', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
    const message = {
      to: 'ExponentPushToken[ZODa4cP9q4KF75vId7ZnI0]',
      title: `New message from ${user.userId}!`,
      body: messageBody,
    }
    const sendNotificationRequest = await sendNotification(message)
    const { message: sentNotification } = await sendNotificationRequest.json()
    const newNotifications = notifications.slice()
    console.dir(sentNotification)
    newNotifications.push(sentNotification)
    setNotifications(newNotifications)
    // dummyScrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Screen>
      <FlatList
        className="flex h-1"
        data={conversationNotifications}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(message) => message._id.toString()}
        renderItem={({ item: message }) => {
          const senderSpecificStyles =
            message.from === user.userId ? 'bg-gray-300' : 'bg-blue-300'
          return (
            <View
              className={`${senderSpecificStyles} p-3 rounded-r-lg rounded-bl-lg`}
            >
              {/* <div class="flex w-full mt-2 space-x-3 max-w-xs"> */}
              {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
              {/* <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg */}
              {/* <Image source={{ uri: photoURL }} style={styles.image} /> */}
              <Text>{message.body}</Text>
            </View>
          )
        }}
        refreshing={refreshing}
      />
      <Form
        initialValues={{
          messageBody: '',
        }}
        onSubmit={sendMessage}
      >
        <FormField
          name={'messageBody'}
          maxLength={255}
          placeholder="Escribir mensaje"
        />

        <SubmitButton
          className="py-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
          title="Enviar"
        />
      </Form>
    </Screen>
  )
}

export default ConversationScreen
