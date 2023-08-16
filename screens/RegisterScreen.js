import React, { useState, useRef, useEffect } from 'react'
import Screen from '../components/Screen'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
} from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseApp } from '../App'
import { convertAnonymousUser, subscribeUserToQuiltro } from '../api/index'
import useOnboarding from '../contexts/onboarding/useOnboarding'
import useQuiltro from '../contexts/quiltro/useQuiltro'
import useAuth from '../contexts/auth/useAuth'

function RegisterScreen() {
  const recaptchaVerifierRef = useRef(null)
  const auth = getAuth(firebaseApp)
  const { quiltro, setQuiltro } = useQuiltro()
  const { onboardingUser, setOnboardingUser } = useOnboarding()
  const { user, setUser } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState(null)

  const sendVerification = () => {
    const phoneProvider = new PhoneAuthProvider(auth)
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
      .then(setVerificationId)
  }

  const confirmCode = () => {
    const credential = PhoneAuthProvider.credential(verificationId, code)
    if (onboardingUser) {
      linkWithCredential(auth.currentUser, credential).then(async (auth) => {
        const { user } = auth
        // TODO i think creates new user in the db, make sure to dedupe if so
        const convertResponse = await convertAnonymousUser(user)
        if (convertResponse.ok) {
          const updatedUser = await convertResponse.json()
          const { uid } = updatedUser
          const { quiltroId } = quiltro
          const subscribeResponse = await subscribeUserToQuiltro(uid, quiltroId)
          if (subscribeResponse.ok) {
            setOnboardingUser(null)
            setUser(updatedUser)
          }
        }
      })
    } else {
      signInWithCredential(auth, credential)
        .then((user) => {
          console.dir('code confirmed')
        })
        .catch((error) => {
          // show error
          console.error(error)
        })
    }
  }

  return (
    <Screen>
      <ImageBackground
        blurRadius={3}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        source={require('../assets/background.jpeg')}
      >
        <View
          style={{
            background: 'rgb(0, 0, 0, 0.5)',
            bottom: '10%',
            width: '100%',
          }}
        >
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifierRef}
            firebaseConfig={firebaseApp.options}
            attemptInvisibleVerification={true}
          />
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#fff',
                margin: 20,
              }}
            >
              Login using OTP
            </Text>
            <TextInput
              placeholder="Numero con codigo del pais"
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              style={{
                paddingTop: 40,
                paddingBottom: 20,
                paddingHorizontal: 20,
                fontSize: 24,
                borderBottomColor: '#fff',
                marginBottom: 20,
                textAlign: 'center',
                color: '#fff',
              }}
            />
            <TouchableOpacity
              onPress={sendVerification}
              style={{
                padding: 20,
                backgroundColor: '#3498',
                borderRadius: 10,
                marginLeft: '0.25em',
                marginRight: '0.25em',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Send Verification
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Confirmar Codigo"
              onChangeText={setCode}
              keyboardType="number-pad"
              style={{
                paddingTop: 40,
                paddingBottom: 20,
                paddingHorizontal: 20,
                fontSize: 24,
                borderBottomColor: '#fff',
                color: '#fff',
                marginBottom: 20,
                textAlign: 'center',
              }}
            />
            <TouchableOpacity
              onPress={confirmCode}
              style={{
                padding: 20,
                backgroundColor: '#9b59',
                borderRadius: 10,
                marginLeft: '0.25em',
                marginRight: '0.25em',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                Confirm Verification
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
}

export default RegisterScreen
