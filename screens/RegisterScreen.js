import { useState, useRef } from 'react'
import Screen from '../components/Screen'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  linkWithCredential,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { TextInput } from 'react-native-gesture-handler'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseApp } from '../App'
import {
  convertAnonymousUser,
  saveStatusEvent,
  subscribeUserToQuiltro,
  saveAnalyticsEvent,
} from '../api/index'
import useOnboarding from '../contexts/onboarding/useOnboarding'
import useQuiltro from '../contexts/quiltro/useQuiltro'
import useAuth from '../contexts/auth/useAuth'
import { formatPhoneNumber } from '../utility/helpers'

function RegisterScreen() {
  const recaptchaVerifierRef = useRef(null)
  const auth = getAuth(firebaseApp)
  const { quiltro } = useQuiltro()
  const {
    onboardingUser,
    setOnboardingUser,
    pendingAdoptionInquiryQuiltro,
    setPendingAdoptionInquiryQuiltro,
  } = useOnboarding()
  const { user, setUser } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(null)
  const [verificationId, setVerificationId] = useState(null)

  const sendVerification = () => {
    const phoneProvider = new PhoneAuthProvider(auth)
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber)

      phoneProvider
        .verifyPhoneNumber(formattedPhoneNumber, recaptchaVerifierRef.current)
        .then(setVerificationId)
        .then(() => {
          setPhoneNumberValidationError(null)
          saveAnalyticsEvent({
            status: 'send_verification',
            details: {
              phoneNumber,
              succeeded: true,
              onboardingUser,
              user,
            },
          })
        })
    } catch (error) {
      setPhoneNumberValidationError(error.message)
      saveAnalyticsEvent({
        status: 'send_verification',
        details: {
          phoneNumber,
          succeeded: false,
          onboardingUser,
          user,
        },
      })
    }
  }

  const sendAdoptionInquiry = async (user, quiltro) => {
    const statusEvent = {}
    statusEvent.quiltroId = quiltro.quiltroId
    statusEvent.status = 'adoption_inquiry'
    const { uid } = user
    const from = uid
    statusEvent.details = {
      body: `Usuari@ con numero ${user.phoneNumber} quiere hablar contigo sobre adoptar ${quiltro.name}`,
      from,
    }
    return await saveStatusEvent(statusEvent)
  }

  const confirmCode = () => {
    const credential = PhoneAuthProvider.credential(verificationId, code)
    if (onboardingUser) {
      linkWithCredential(auth.currentUser, credential).then(async (auth) => {
        const { user } = auth
        const convertResponse = await convertAnonymousUser(user)
        if (convertResponse.ok) {
          const updatedUser = await convertResponse.json()
          const { uid } = updatedUser
          const { quiltroId } = quiltro

          if (pendingAdoptionInquiryQuiltro) {
            await sendAdoptionInquiry(updatedUser, quiltro)
            setPendingAdoptionInquiryQuiltro(null)
          } else {
            // subscribe happens automatically with adoption inquiry
            await subscribeUserToQuiltro(uid, quiltroId)
          }
          setOnboardingUser(null)
          setUser(updatedUser)
        }
      })
    } else {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          signInWithCredential(auth, credential)
            .then((user) => {
              console.dir('code confirmed')
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
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
              Iniciar sesión
            </Text>
            {phoneNumberValidationError ? (
              <Text
                style={{
                  color: 'white',
                  fontSize: 'x-large',
                  marginLeft: '1em',
                  textDecoration: 'underline',
                  textDecorationColor: 'red',
                }}
              >
                {phoneNumberValidationError}
              </Text>
            ) : null}
            <TextInput
              placeholder="Ingresa tu Número Chileno"
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              style={{
                paddingTop: 5,
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
                Enviar Verificación
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
                Confirmar Verificación
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  )
}

export default RegisterScreen
