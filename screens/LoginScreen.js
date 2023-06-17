import React, { useState } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../components/forms'
import useAuth from '../auth/useAuth'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(4).label('Username'),
  password: Yup.string().required().min(7).label('Password'),
})

function LoginScreen(props) {
  const auth = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ username, password }) => {
    const result = await authApi.login(username, password)
    if (!result.ok) return setLoginFailed(true)
    setLoginFailed(false)
    auth.logIn(result.data)
  }

  return (
    <Screen style={styles.container}>
      {/* TODO add paw in place of logo */}
      <Form
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid username and/or password."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          // keyboardType="username"
          name="username"
          placeholder="Username"
          textContentType="usernameLocation"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <View style={styles.buttonsContainer}>
          <SubmitButton title="Login" />
        </View>
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
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
})

export default LoginScreen
