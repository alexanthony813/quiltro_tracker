import React from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  UserIcon,
  LocationMarkerIcon,
  ChevronDownIcon,
  MapPinIcon,
  MapIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/outline';

const AnimalList = (props) => {
  const { animals } = props;
  return (
    <FlatList
      data={animals}
      horizontal={true}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => {
        if (item && item.name) {
          return (
            //animal card
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                overflow: 'hidden',
                marginHorizontal: 5,
                width: 300,
              }}>
              <Image
                source={{ uri: item.photo_url }}
                style={{ width: '100%', aspectRatio: 1 }}
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
                  <Text style={{ fontSize: 12, color: '#808080', marginLeft: 5 }}>
                    Visto por ultimo vez en {item.last_seen_address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

export default AnimalList;
