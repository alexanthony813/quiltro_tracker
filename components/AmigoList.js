import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { Image } from 'expo-image'
import Button from './Button'
import colors from '../config/colors'
import { calculateDaysPassed } from '../utility/helpers'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const AmigoList = ({ amigos, setReportingAmigoId }) => {
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
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => {
        const {
          last_status_event,
          last_seen_date,
          photo_url,
          name,
          status,
          description,
        } = item
        let daysElapsedSinceLastSeen
        if (last_status_event && last_status_event.status === 'sighted') {
          daysElapsedSinceLastSeen = calculateDaysPassed(
            new Date(last_status_event.time),
            now
          )
        } else {
          daysElapsedSinceLastSeen = calculateDaysPassed(
            new Date(item.last_seen_date),
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
              source={{ uri: photo_url }}
              style={{ width: '100%', aspectRatio: 1 }}
              loading={'lazy'}
              placeholder={blurhash}
              priority={imageLoadPriority}
            />
            <View className="attribute-container flex flex-row">
              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {status}
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }}>
                  {description}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MapPinIcon color={colors[colors.icon]} size={16} />
                  {last_status_event?.status === 'sighted' ? (
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
                      {/* TODO {item.last_seen_location} */}
                      Perdido hace {daysElapsedSinceLastSeen} dias
                    </Text>
                  )}
                </View>
              </View>
              <View className="status-action-container flex items-center justify-center w-1/3 h-1/5 rounded absolute top-3.5 right-2.5 bg-teal-600">
                <Button
                  onPress={() => {
                    setReportingAmigoId(item._id)
                  }}
                  color={'bg-teal-600'}
                  title={'Reportar'}
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
