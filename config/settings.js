import Constants from 'expo-constants'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://quiltro-637d7.web.app'

const settings = {
  dev: {
    apiUrl: `${baseUrl}`,
  },
  staging: {
    apiUrl: `${baseUrl}`,
  },
  prod: {
    apiUrl: `${baseUrl}`,
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging
  return settings.prod
}

export default getCurrentSettings()
