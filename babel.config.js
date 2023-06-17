module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      'tailwindcss-react-native/babel',
      'react-native-reanimated/plugin',
    ],
    presets: ['babel-preset-expo'],
  }
}
