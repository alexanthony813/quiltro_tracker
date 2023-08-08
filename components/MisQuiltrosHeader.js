import React from 'react'
import { View, Pressable } from 'react-native'
import Text from './Text'
import { PlusCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'
import routes from '../navigation/routes'
import useAuth from '../contexts/auth/useAuth'

function MisQuiltrosHeader({ quiltro }) {
  const { user } = useAuth()
  const navigation = useNavigation()
  const headerText = quiltro ? `Mi ${quiltro.name}` : `Mis Quiltros Seguidos`
  return (
    <View className="mx-1">
      <View className="flex-row justify-between items-center ml-5 ">
        {navigation.canGoBack() ? (
          <Button
            title="←"
            onPress={() => {
              navigation.goBack()
            }}
          />
        ) : null}
        <View>
          <Text className="font-bold text-2xl -mx-1.5">{headerText}</Text>
        </View>
        <View className="flex-row space-x-2 p-3 items-end">
          {user.isAdmin && !quiltro ? (
            <Pressable
              onPress={() => {
                navigation.navigate(routes.NEW_QUILTRO)
              }}
            >
              <PlusCircleIcon color="#00CCBB" />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default MisQuiltrosHeader
