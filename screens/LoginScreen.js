import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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
  phoneNumber: Yup.string().required().min(4).label('PhoneNumber'),
  // password: Yup.string().required().min(7).label('Password'),
})

function LoginScreen(props) {
  const auth = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async ({ phoneNumber }) => {
    const result = await authApi.login(phoneNumber)
    if (!result.ok) return setLoginFailed(true)
    setLoginFailed(false)
    auth.logIn(result.data)
  }

  return (
    <Screen style={styles.container}>
      {/* TODO add paw in place of logo */}
      <Form
        initialValues={{ phoneNumber: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid phone number."
          visible={loginFailed}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          // keyboardType="phoneNumber"
          name="phoneNumber"
          placeholder="PhoneNumber"
          textContentType="phoneNumberLocation"
        />
        {/* <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        /> */}
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
