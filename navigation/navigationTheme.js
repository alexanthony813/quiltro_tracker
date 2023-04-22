import { DefaultTheme } from '@react-navigation/native'
import colors from '../config/colors'
export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
}

export default navigationTheme
