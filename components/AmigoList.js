import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { Image } from 'expo-image'
import Button from './Button'
import colors from '../config/colors'
import { calculateDaysPassed } from '../utility/helpers'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const AmigoList = ({ user, amigos, setReportingAmigo }) => {
  const now = new Date()

  return (
    <FlatList
      data={amigos}
      horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item: amigo, index }) => {
        const {
          lastStatusEvent,
          lastSeenDate,
          photoUrl,
          name,
          user,
          status,
          description,
        } = amigo
        let daysElapsedSinceLastSeen
        if (lastStatusEvent && lastStatusEvent.status === 'sighted') {
          daysElapsedSinceLastSeen = calculateDaysPassed(
            new Date(lastStatusEvent.time),
            now
          )
        } else {
          daysElapsedSinceLastSeen = calculateDaysPassed(
            new Date(amigo.lastSeenDate),
            now
          )
        }
        const imageLoadPriority = index < 2 ? 'high' : 'low'
        return (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 8,
              overflow: 'hidden',
              marginHorizontal: 5,
              width: 300,
            }}
          >
            <Image
              source={{ uri: photoUrl }}
              style={{ width: '100%', aspectRatio: 1 }}
              loading={'lazy'}
              placeholder={blurhash}
              priority={imageLoadPriority}
            />
            <View className="attribute-container flex flex-row">
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                {user?.phone_number && (
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {status}
                  </Text>
                )}
                <Text style={{ fontSize: 14, marginBottom: 5 }}>
                  {description}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MapPinIcon color={colors[colors.icon]} size={16} />
                  {lastStatusEvent?.status === 'sighted' ? (
                    <Text>Visto hace {daysElapsedSinceLastSeen} dias!!</Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors[colors.icon],
                        marginLeft: 5,
                      }}
                    >
                      {/* would be cool to have seen x away and sort by that, update based on reports and have special icon/style if recent */}
                      Perdido hace {daysElapsedSinceLastSeen} dias
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{ alignItems: 'center' }}
                className="status-action-container flex amigos-center justify-center w-1/3 h-1/5 rounded absolute top-3.5 right-2.5 bg-teal-600"
              >
                <Button
                  onPress={() => {
                    setReportingAmigo(amigo)
                  }}
                  color={'bg-teal-600'}
                  title={'Reportar'}
                  // isDisabled={amigo.owner_id === user.userId}, don't want to scare the owner by hiding/disabling the button
                />
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default AmigoList
