import { View, Pressable } from 'react-native'
import Text from './Text'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import routes from '../navigation/routes'
import useAuth from '../contexts/auth/useAuth'
import BackButton from '../components/BackButton'

function MisQuiltrosHeader({ quiltro }) {
  const { user } = useAuth()
  const navigation = useNavigation()
  const defaultText = user.isAdmin ? `Mis Perros` : `Mis Perros Seguidos`
  const headerText =
    quiltro && quiltro.name ? `Mi ${quiltro.name}` : defaultText
  return (
    <View style={{ marginLeft: '0.25rem', marginRight: '0.25rem' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: '1.25rem',
        }}
      >
        {navigation.canGoBack() ? (
          <BackButton
            title="←"
            onPress={() => {
              navigation.goBack()
            }}
          />
        ) : null}
        <View style={{ textAlign: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: '2rem',
              marginLeft: '-0.375rem',
            }}
          >
            {headerText}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            padding: '0.75rem',
            alignItems: 'flex-end',
          }}
        >
          {user.isAdmin && !quiltro ? (
            <Pressable
              onPress={() => {
                navigation.navigate(routes.NEW_QUILTRO)
              }}
            >
              <MaterialCommunityIcons
                name="plus-circle"
                size={30}
                color="#00CCBB"
              />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default MisQuiltrosHeader
