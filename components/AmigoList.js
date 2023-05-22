import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { Image } from 'expo-image'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const AmigoList = (props) => {
  const { amigos } = props

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

              <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 5 }}>
                  {item.description}
                </Text>
                <Text style={{ fontSize: 12, color: '#808080' }}>
                  {item.message}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MapPinIcon color="#808080" size={16} />
                  <Text
                    style={{ fontSize: 12, color: '#808080', marginLeft: 5 }}
                  >
                    Visto por ultimo vez en {item.last_seen_address}
                  </Text>
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
