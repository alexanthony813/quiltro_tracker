import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { MapPinIcon } from 'react-native-heroicons/outline'
import { Image } from 'expo-image'
import Text from './Text'

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// TODO make more generalized and/or rename, for now can be 1:1 with AmigoCard and only extend to MiAmigo, otherwise in future differ
function Card({ item, imageLoadPriority, showAllDetails }) {
  console.log(item.photo_url)
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
        source={{ uri: item.photo_url }}
        style={{ width: '100%', aspectRatio: 1 }}
        loading={'lazy'}
        placeholder={blurhash}
        priority={imageLoadPriority}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
        <Text style={{ fontSize: 14, marginBottom: 5 }}>
          {item.description}
        </Text>
        <Text style={{ fontSize: 12, color: '#808080' }}>{item.message}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MapPinIcon color="#808080" size={16} />
          <Text style={{ fontSize: 12, color: '#808080', marginLeft: 5 }}>
            Visto por ultimo vez en {item.last_seen_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 15,
//     backgroundColor: colors.white,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   detailsContainer: {
//     padding: 20,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//   },
//   subTitle: {
//     color: colors.secondary,
//     fontWeight: "bold",
//   },
//   title: {
//     marginBottom: 7,
//   },
// });

{
  /* <TouchableWithoutFeedback onPress={onPress}>
<View style={styles.card}>
  <Image
    style={styles.image}
    tint="light"
    preview={{ uri: thumbnailUrl }}
    uri={imageUrl}
  />
  <View style={styles.detailsContainer}>
    <Text style={styles.title} numberOfLines={1}>
      {title}
    </Text>
    <Text style={styles.subTitle} numberOfLines={2}>
      {subTitle}
    </Text>
  </View>
</View>
</TouchableWithoutFeedback> */
}

export default Card
