import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'
import { saveNewStatusEvent } from '../api'
import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import QuiltroDetails from '../components/QuiltroDetails'
import { getQuiltroDetails } from '../api/index'
import useApi from '../hooks/useApi'
import useAuth from '../contexts/auth/useAuth'
import useOnboarding from '../contexts/onboarding/useOnboarding'
import useQuiltro from '../contexts/quiltro/useQuiltro'
import { timeSince } from '../utility/helpers'

function QuiltroDetailsScreen({ route }) {
  const { quiltro } = route.params
  const { setQuiltro } = useQuiltro()
  const { quiltroId } = quiltro
  const navigation = useNavigation()
  const { user, setUser } = useAuth()
  const { setOnboardingUser } = useOnboarding()
  const [isNoProblem, setIsNoProblem] = useState(false)
  const {
    data: quiltroDetails,
    error,
    isLoading,
    request: loadQuiltroDetails,
  } = useApi(getQuiltroDetails)
  useEffect(() => {
    loadQuiltroDetails(quiltroId)
  }, [JSON.stringify(quiltroDetails)])

  const handleStartConvertAnonymous = () => {
    setOnboardingUser(user)
    setUser(null)
    setQuiltro(quiltroDetails)
  }

  const recordNoProblemHandler = async () => {
    const statusEvent = {}
    statusEvent.status = 'problem_denied'
    statusEvent.quiltroId = quiltro.quiltroId
    const from = user.uid
    statusEvent.details = {
      body: `Se reportó que no hay problema`,
      from,
    }
    saveNewStatusEvent({
      ...statusEvent,
    })
    setIsNoProblem(true)
  }

  return (
    <Screen>
      <MisQuiltrosHeader quiltro={quiltroDetails} />
      {/* TODO why is this using preview? image not loading immediately */}
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        <Image
          style={{
            width: '80%',
            left: '10%',
            height: 240,
            marginVertical: '0.25em',
          }}
          preview={{ uri: quiltroDetails.photoUrl }}
          tint="light"
          uri={quiltroDetails.photoUrl}
        />
      </View>
      <View>
        <QuiltroDetails quiltro={quiltro} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'space-around',
            height: '15%',
          }}
        >
          <Button
            styles={{
              marginLeft: '0.5em',
              marginRight: '0.5em',
              width: '30%',
              marginVertical: '0',
              height: '105%',
            }}
            color="secondary"
            textStyles={{ width: '105%' }}
            title="Seguir novedades y problemas"
            onPress={() => {
              if (
                window.confirm('Para seguir necesitas crear cuenta con numero')
              ) {
                handleStartConvertAnonymous()
              }
            }}
          />
          <Button
            styles={{
              marginLeft: '0.5em',
              marginRight: '0.5em',
              width: '50%',
              marginVertical: '0',
              height: '105%',
            }}
            color="primary"
            title="Reportar Problema"
            onPress={() => {
              navigation.navigate(routes.QUILTRO_REPORT, {
                quiltro: quiltroDetails,
              })
            }}
          />
        </View>
        {quiltro.isAdoptable ? (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'center',
              justifyContent: 'space-around',
              width: '96%',
              left: '2%',
            }}
          >
            <Button
              styles={{
                backgroundColor: 'rgb(70, 130, 180)',
              }}
              title="Consultar Adopción"
              onPress={() => {
                if (
                  window.confirm(
                    'Para seguir necesitas crear cuenta con numero'
                  )
                ) {
                  handleStartConvertAnonymous()
                }
              }}
            />
          </View>
        ) : null}
        {quiltro.lastReportedProblem ? (
          <View
            style={{
              paddingLeft: '1em',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {isNoProblem ? (
              <Text>Gracias por tu respuesta!</Text>
            ) : (
              <>
                <Text>
                  Ves algo? Se reportó problema hace{' '}
                  {timeSince(quiltro.lastReportedProblem.time)}
                </Text>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onPress={() => {
                    navigation.navigate(routes.QUILTRO_REPORT, {
                      quiltro: quiltroDetails,
                    })
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: 'blue',
                    }}
                  >
                    Sí
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                  onPress={recordNoProblemHandler}
                >
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: 'blue',
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ) : null}
      </View>
    </Screen>
  )
}

export default QuiltroDetailsScreen
