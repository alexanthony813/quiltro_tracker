import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { Image } from 'expo-image'
import Button from './Button'
import colors from '../config/colors'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const AmigoList = ({ amigos, setReportingAmigoId }) => {
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
        if (item && item.name) {
          const imageLoadPriority = index < 2 ? 'high' : 'low'
          return (
            //animal card
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
                source={{ uri: item.photo_url }}
                style={{ width: '100%', aspectRatio: 1 }}
                loading={'lazy'}
                placeholder={blurhash}
                priority={imageLoadPriority}
              />
              <View className="attribute-container flex flex-row">
                <View style={{ padding: 10 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, marginBottom: 5 }}>
                    {item.description}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors[colors.icon] }}>
                    {item.message}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MapPinIcon color={colors[colors.icon]} size={16} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors[colors.icon],
                        marginLeft: 5,
                      }}
                    >
                      {/* would be cool to have seen x away and sort by that, update based on reports and have special icon/style if recent */}
                      Visto por ultimo vez en {item.last_seen_location}
                    </Text>
                  </View>
                </View>

                {/* TODO pass action buttons in so this doesn't differ from Mis to Perdidos */}
                <View className="status-action-container h-1/2">
                  <Button
                    onPress={() => {
                      setReportingAmigoId(item._id)
                    }}
                    color={colors[colors.secondary]}
                    title={'Reportar'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )
        }
      }}
    />
  )
}

export default AmigoList
