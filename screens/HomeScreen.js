import React, { useLayoutEffect } from "react";
import {
    Text,
    TextInput,
    View,
    SafeAreaView,
    ScrollView,
    Image
} from "react-native";
import  { useNavigation } from "@react-navigation/native"
import {
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon
} from "react-native-heroicons/outline"

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [])


    return (
      <SafeAreaView className="bg-white pt-5">
        <Text>
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
                <Image
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    source={{
                        uri: "https://links.papareat.com/wru"
                    }}
                />

                <View className="flex-1">
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size ={20} color="#00CCBB" />
                    </Text>
                </View>
                
                <UserIcon size={35} color="#00CCBB" />
            </View>

            {/* Map */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>

            {/* Dog List */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
            </ScrollView>
        </Text>
      </SafeAreaView>
    )
}

export default HomeScreen;
