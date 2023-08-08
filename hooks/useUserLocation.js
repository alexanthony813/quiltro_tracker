import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const useUserLocation = () => {
  const [location, setLocation] = useState()

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) {
        return
      }
      const lastKnownPosition = await Location.getCurrentPositionAsync({})
      const {
        coords: { latitude, longitude },
      } = lastKnownPosition
      setLocation({ latitude, longitude })
    } catch (error) {
      console.dir(error)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return location
}

export default useUserLocation
