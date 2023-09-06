import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'
import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import QuiltroDetails from '../components/QuiltroDetails'
import {
  getQuiltroDetails,
  getQuiltroPdf,
  saveStatusEvent,
  subscribeUserToQuiltro,
  saveAnalyticsEvent,
} from '../api/index'
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
  const { uid } = user
  const { setOnboardingUser, setPendingAdoptionInquiryQuiltro } =
    useOnboarding()
  const [isFollowingQuiltro, setIsFollowingQuiltro] = useState(false)
  const [hasInquiredAboutAdoption, setHasInquiredAboutAdoption] =
    useState(false)
  const [isNoProblem, setIsNoProblem] = useState(false)
  const {
    data: quiltroDetails,
    error,
    isLoading,
    request: loadQuiltroDetails,
  } = useApi(getQuiltroDetails)
  useEffect(() => {
    loadQuiltroDetails(quiltroId)
    if (user.quiltroIds && user.quiltroIds.indexOf(quiltroId) >= -1) {
      setIsFollowingQuiltro(true)
    }
    if (
      user.adoptionInquiryIds &&
      user.adoptionInquiryIds.indexOf(quiltroId) >= -1
    ) {
      setHasInquiredAboutAdoption(true)
    }
  }, [
    JSON.stringify(quiltroDetails),
    isFollowingQuiltro,
    setHasInquiredAboutAdoption,
  ])

  const handleInquireAdoption = async () => {
    saveAnalyticsEvent({
      status: 'adoption_inquiry',
      details: {
        uid,
        quiltroId,
      },
    })
    if (user.isAnonymous) {
      if (window.confirm('Para seguir necesitas crear cuenta con numero')) {
        setOnboardingUser(user)
        setUser(null)
        setPendingAdoptionInquiryQuiltro(quiltroDetails)
        setQuiltro(quiltroDetails)
      }
    } else {
      const statusEvent = {}
      statusEvent.quiltroId = quiltro.quiltroId
      const from = uid
      statusEvent.status = 'adoption_inquiry'
      statusEvent.details = {
        body: `Usuari@ con numero ${user.phoneNumber} quiere hablar contigo sobre adoptar ${quiltro.name}`,
        from,
      }
      const savedStatusEventResponse = await saveStatusEvent(statusEvent)
      if (savedStatusEventResponse.ok) {
        setHasInquiredAboutAdoption(true)
        setIsFollowingQuiltro(true)
      }
    }
  }

  const handleFollow = async () => {
    saveAnalyticsEvent({
      status: 'follow_quiltro',
      details: {
        uid,
        quiltroId,
      },
    })
    if (user.isAnonymous) {
      if (window.confirm('Para seguir necesitas crear cuenta con numero')) {
        setOnboardingUser(user)
        setUser(null)
        setQuiltro(quiltroDetails)
      }
    } else {
      const subscribeResponse = await subscribeUserToQuiltro(uid, quiltroId)
      if (subscribeResponse.ok) {
        setIsFollowingQuiltro(true)
      }
    }
  }

  const handleDownloadPDF = async () => {
    const pdfResponse = await getQuiltroPdf(quiltro.quiltroId)
    const blob = await pdfResponse.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = `${quiltro.name}-volante.pdf`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(blobUrl)
  }

  const recordNoProblemHandler = async () => {
    saveAnalyticsEvent({
      status: 'report_no_problem',
      details: {
        quiltroId,
        uid,
      },
    })
    const statusEvent = {}
    statusEvent.status = 'problem_denied'
    statusEvent.quiltroId = quiltro.quiltroId
    const from = user.uid
    statusEvent.details = {
      body: `Se reportó que no hay problema`,
      from,
    }
    await saveStatusEvent({
      ...statusEvent,
    })
    setIsNoProblem(true)
  }

  return (
    <Screen>
      {user.isAnonymous ? null : <MisQuiltrosHeader quiltro={quiltroDetails} />}
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
        {user.isAdmin ? (
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
              color="secondary"
              title="Descargar Volante"
              onPress={handleDownloadPDF}
            />
          </View>
        ) : (
          <>
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
                  backgroundColor: isFollowingQuiltro
                    ? 'rgb(128, 128, 128)'
                    : 'rgb(70, 130, 180)',
                }}
                textStyles={{ width: '105%' }}
                title={
                  isFollowingQuiltro
                    ? 'Ya estas siguiendo'
                    : 'Seguir novedades y problemas'
                }
                isDisabled={isFollowingQuiltro}
                onPress={handleFollow}
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
                  saveAnalyticsEvent({
                    status: 'report_problem',
                    details: {
                      quiltroId,
                      uid,
                    },
                  })
                  navigation.navigate(routes.QUILTRO_REPORT, {
                    quiltro: quiltroDetails,
                  })
                }}
              />
            </View>
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
                color="secondary"
                title={
                  hasInquiredAboutAdoption
                    ? 'Ya has consultado'
                    : 'Consultar Adopción'
                }
                onPress={handleInquireAdoption}
                isDisabled={hasInquiredAboutAdoption}
              />
            </View>
          </>
        )}
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
