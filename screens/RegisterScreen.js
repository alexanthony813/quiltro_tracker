import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'
import Screen from '../components/Screen'
import { View, Text, TouchableOpacity } from 'react-native'
import {
  getAuth,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler'

function RegisterScreen() {
  // const auth = getAuth(firebaseApp)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)

  // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'captcha-container', {
  //   size: 'invisible',
  // })

  const sendVerification = () => {
    const phoneProvider = new PhoneAuthProvider()
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
    setPhoneNumber('')
  }

  const confirmCode = () => {
    const credential = PhoneAuthProvider.credential(verificationId, code)
    signInWithCredential(credential)
      .then(() => {
        setCode('')
      })
      .catch((error) => {
        // show error
      })
    Alert.alert('log in successfulllll')
  }

  return (
    <Screen>
      <View>
        <View>
          <Text styles={styles.otpText}>Login using OTP</Text>
          <TextInput
            placeholder="Phone number with country code"
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={sendVerification}
            styles={styles.sendVerification}
          >
            <Text styles={styles.buttonText}>Send Verification</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Confirm Code"
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.textInput}
          />
          <TouchableOpacity onPress={confirmCode} styles={styles.sendCode}>
            <Text styles={styles.buttonText}>Confirm Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  sendVerification: {
    padding: 20,
    backgroundColor: '#3498',
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: '#9b59',
    borderRadius: 10,
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 20,
  },
})

export default RegisterScreen
