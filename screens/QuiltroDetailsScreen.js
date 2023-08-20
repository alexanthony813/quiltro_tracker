import { useEffect } from 'react'
import { View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'

import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import QuiltroDetails from '../components/QuiltroDetails'
import { getQuiltroDetails } from '../api/index'
import useApi from '../hooks/useApi'
import useAuth from '../contexts/auth/useAuth'
import useOnboarding from '../contexts/onboarding/useOnboarding'
import useQuiltro from '../contexts/quiltro/useQuiltro'

function QuiltroDetailsScreen({ route }) {
  const { quiltro } = route.params // TODO remove before merge, just use hooks
  const { quiltroId } = quiltro
  const navigation = useNavigation()
  const { user, setUser } = useAuth()
  const { setOnboardingUser } = useOnboarding()
  const { setQuiltro } = useQuiltro()
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

  return (
    <Screen>
      <MisQuiltrosHeader quiltro={quiltroDetails} />
      {/* TODO why is this using preview? image not loading immediately */}
      <Image
        style={{
          width: '100%',
          height: 300,
        }}
        preview={{ uri: quiltroDetails.photoUrl }}
        tint="light"
        uri={quiltroDetails.photoUrl}
      />
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
              height: '100%',
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
              height: '100%',
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
                  window.confirm('Para seguir necesitas crear cuenta con numero')
                ) {
                  handleStartConvertAnonymous()
                }
              }}
            />
          </View>
        ) : null}
      </View>
    </Screen>
  )
}

export default QuiltroDetailsScreen
