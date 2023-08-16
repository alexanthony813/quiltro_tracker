import Constants from 'expo-constants'

const baseUrl = 'quiltro-637d7.web.app'

const settings = {
  dev: {
    apiUrl: `https://${baseUrl}`,
  },
  staging: {
    apiUrl: `https://${baseUrl}`,
  },
  prod: {
    apiUrl: `https://${baseUrl}`,
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging
  return settings.prod
}

export default getCurrentSettings()
