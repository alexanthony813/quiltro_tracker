import Constants from 'expo-constants'

const myPhone = '192.168.0.2'
const localhost = 'localhost'

const settings = {
  dev: {
    apiUrl: `http://${localhost}:3000`,
  },
  staging: {
    apiUrl: `http://${localhost}:3000`,
  },
  prod: {
    apiUrl: `http://${localhost}:3000`,
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging
  return settings.prod
}

export default getCurrentSettings()
