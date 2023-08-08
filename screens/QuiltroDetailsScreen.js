import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import Screen from '../components/Screen'
import MisQuiltrosHeader from '../components/MisQuiltrosHeader'
import Button from '../components/Button'
import colors from '../config/colors'

import routes from '../navigation/routes'
import { useNavigation } from '@react-navigation/native'
import QuiltroDetails from '../components/QuiltroDetails'
import QuiltroRequestList from '../components/QuiltroRequestList'
import { getQuiltroDetails } from '../api/index'
import useApi from '../hooks/useApi'

function timeSince(time) {
  const date = new Date(time)
  let seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}

function QuiltroDetailsScreen({ route }) {
  const { quiltro } = route.params
  const { quiltroId } = quiltro
  const navigation = useNavigation()
  const {
    data: quiltroDetails,
    error,
    isLoading,
    request: loadQuiltroDetails,
  } = useApi(getQuiltroDetails)
  useEffect(() => {
    loadQuiltroDetails(quiltroId)
  }, [JSON.stringify(quiltroDetails)])

  return (
    <Screen>
      <MisQuiltrosHeader quiltro={quiltroDetails} />
      <Image
        style={styles.image}
        preview={{ uri: quiltroDetails.photoUrl }}
        tint="light"
        uri={quiltroDetails.photoUrl}
      />
      <View style={styles.detailsContainer}>
        <QuiltroDetails quiltro={quiltro} />
        <View style={styles.quiltroActions}>
          <Button
            styles={{
              marginBottom: '0.5em',
              borderRadius: '10%',
              width: '30%',
            }}
            color="secondary"
            title="Seguir"
            onPress={() => {
              // TODO
            }}
          />
          <Button
            styles={{
              marginBottom: '0.5em',
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
        {quiltroDetails.lastStatusEvent ? (
          <View>
            <Text>
              Has visto problema? Uno estuvo reportado desde hace
              {` ${timeSince(quiltroDetails.lastStatusEvent.time)}`}
            </Text>
          </View>
        ) : null}

        {quiltroDetails && quiltroDetails.requestedItems ? (
          <QuiltroRequestList requestedItems={quiltroDetails.requestedItems} />
        ) : null}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  quiltroActions: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-around',
    // width: '100%',
    // marginLeft: '20%',
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
})

export default QuiltroDetailsScreen
