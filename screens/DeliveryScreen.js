import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

// Import HeroIcons
import { XMarkIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";

const DeliveryScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="flex-1 bg-[#01ccbd] ">
      <StatusBar style="dark" />
      <SafeAreaView className="z-40">
        <View className="flex-row items-center justify-between px-5 mt-2 mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="font-extrabold">
            <XMarkIcon color="#fff" size={30} />
          </TouchableOpacity>
          <Text
            className="text-lg leading-5 text-white"
            style={{ fontFamily: "Quicksand_600SemiBold" }}>
            Order Help
          </Text>
        </View>

        <View className="space-y-1 bg-white rounded-md mx-4 my-2 pt-2 pb-3 px-4 z-50 shadow-xl shadow-gray-950">
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className="text-base leading-4 text-gray-700"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                Estimated Arrival
              </Text>
              <Text
                className="text-3xl leading-9"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                45-55 Minutes
              </Text>
            </View>

            <Image
              source={{
                uri: "https://links.papareact.com/fls",
              }}
              className="w-20 h-20"
            />
          </View>

          <Progress.Bar size={30} color="#01ccbd" indeterminate={true} />

          <Text
            className="text-gray-700 text-xs pt-1"
            style={{ fontFamily: "Quicksand_600SemiBold" }}>
            Your order at{" "}
            <Text style={{ fontFamily: "Quicksand_700Bold" }}>{restaurant.title}</Text> is
            being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 z-0 -mt-14"
        mapType="mutedStandard">
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#920e0e"
        />
      </MapView>

      <View className="flex-row items-center bg-white px-4 h-16 space-x-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="w-8 h-8"
        />

        <View className="flex-1">
          <Text className="text-lg leading-5" style={{ fontFamily: "Quicksand_700Bold" }}>
            Muhammad Nabeel
          </Text>

          <Text
            className="text-sm leading-4"
            style={{ fontFamily: "Quicksand_600SemiBold" }}>
            Your Rider
          </Text>
        </View>

        <Text
          className="text-lg leading-5 text-[#01ccbd]"
          style={{ fontFamily: "Quicksand_700Bold" }}>
          Call
        </Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
