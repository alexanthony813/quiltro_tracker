import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'

import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import QuiltroDetails from '../components/QuiltroDetails'
import QuiltroRequestList from '../components/QuiltroRequestList'
import { getQuiltroDetails } from '../api/index'
import useApi from '../hooks/useApi'
import useAuth from '../contexts/auth/useAuth'
import useOnboarding from '../contexts/onboarding/useOnboarding'

function QuiltroDetailsScreen({ route }) {
  const { quiltro } = route.params
  const { quiltroId } = quiltro
  const navigation = useNavigation()
  const { user, setUser } = useAuth()
  const { setOnboardingUser } = useOnboarding()
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
  }

  return (
    <Screen>
      <MisQuiltrosHeader quiltro={quiltroDetails} />
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
            height: '30%',
            top: '-6%',
          }}
        >
          <Button
            styles={{
              marginLeft: '0.5em',
              marginRight: '0.5em',
              borderRadius: '10%',
              width: '30%',
            }}
            color="secondary"
            title="Seguir"
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
              borderRadius: '10%',
              width: '50%',
            }}
            color="primary"
            title="Reportar Problema"
            onPress={() => {
              console.dir(quiltroDetails)
              navigation.navigate(routes.QUILTRO_REPORT, {
                quiltro: quiltroDetails,
              })
            }}
          />
        </View>
        {quiltroDetails && quiltroDetails.requestedItems ? (
          <QuiltroRequestList requestedItems={quiltroDetails.requestedItems} />
        ) : null}
      </View>
    </Screen>
  )
}

export default QuiltroDetailsScreen
