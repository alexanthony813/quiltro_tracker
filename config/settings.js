import Constants from 'expo-constants'

const localhost = '102.129.153.236'

const settings = {
  dev: {
    apiUrl: `http://localhost:3000`,
  },
  staging: {
    apiUrl: `http://localhost:3000`,
  },
  prod: {
    apiUrl: `http://localhost:3000`,
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging
  return settings.prod
}

export default getCurrentSettings()
