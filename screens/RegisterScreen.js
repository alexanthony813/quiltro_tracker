import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms'
import useApi from '../hooks/useApi'
import { ActivityIndicator, View } from 'react-native'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Name'),
  password: Yup.string().required().min(7).label('Password'),
})

function RegisterScreen() {
  const registerApi = useApi(usersApi.register)
  const loginApi = useApi(authApi.login)
  const auth = useAuth()
  const [error, setError] = useState()

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo)

    if (!result.ok) {
      if (result.data) setError(result.data.error)
      else {
        setError('An unexpected error occurred.')
        console.log(result)
      }
      return
    }

    const { data: authToken } = await loginApi.request(
      userInfo.username,
      userInfo.password
    )
    auth.logIn(authToken)
  }

  return (
    <>
      <Screen style={styles.container}>
        <Form
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="Username"
          />
          {/* <FormField ^Yup choices
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        /> */}
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            // textContentType="password"
          />
          <View style={styles.buttonsContainer}>
            <SubmitButton title="Registrar" />
          </View>
        </Form>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
})

export default RegisterScreen
