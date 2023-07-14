import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { loginUser, registerUser } from '../api/index'
import useAuth from '../auth/useAuth'
import Screen from '../components/Screen'
import { Form, FormField, SubmitButton } from '../components/forms'
import useApi from '../hooks/useApi'
import { View } from 'react-native'

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required().label('Name'),
  // password: Yup.string().required().min(7).label('Password'),
})

function RegisterScreen() {
  const registerApi = useApi(registerUser)
  const loginApi = useApi(loginUser)
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

    const { data: authToken } = await loginApi.request(userInfo.phoneNumber)
    auth.logIn(authToken)
  }

  return (
    <>
      <Screen style={styles.container}>
        <Form
          initialValues={{ phoneNumber: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCorrect={false}
            icon="account"
            name="phoneNumber"
            placeholder="PhoneNumber"
          />
          {/* <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            // textContentType="password"
          /> */}
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
