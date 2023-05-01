import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms'
import authApi from '../api/auth'
import useAuth from '../auth/useAuth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(4).label('Username'),
  phone_number: Yup.string().required().min(7).label('Phone Number'),
})

function LoginScreen(props) {
  const auth = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ username, phone_number }) => {
    const result = await authApi.login(username, phone_number)
    if (!result.ok) return setLoginFailed(true)
    setLoginFailed(false)
    auth.logIn(result.data)
  }

  return (
    <Screen style={styles.container}>
      {/* TODO add paw in place of logo */}
      <Form
        initialValues={{ username: '', phone_number: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid username and/or phone number."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          // keyboardType="username"
          name="username"
          placeholder="Username"
          textContentType="usernameAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="phone_number"
          placeholder="Phone Number"
          secureTextEntry
          textContentType="phone_number"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})

export default LoginScreen
