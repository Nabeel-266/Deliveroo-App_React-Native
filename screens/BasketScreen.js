import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { selectRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { selectBasketItemsTotalPrice } from "../features/selectors";

// Import HeroIcons
import { XCircleIcon, MinusCircleIcon } from "react-native-heroicons/solid";

const BasketScreen = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const restaurant = useSelector(selectRestaurant);
  const basketTotalPrice = useSelector(selectBasketItemsTotalPrice);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      // Check if there is an array for the current item.id, if not, create one
      results[item.id] = results[item.id] || [];

      // Add the current item to the array
      results[item.id].push(item);

      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      <View className="flex-1 bg-gray-100 gap-y-5">
        {/* Top Bar */}
        <View className="flex-row items-center shadow-lg shadow-gray-700">
          <View className="w-full py-4 bg-white relative">
            <Text
              className="text-[22px] text-center leading-7"
              style={{ fontFamily: "Quicksand_700Bold" }}>
              Basket
            </Text>
            <Text
              className="text-xs text-center text-gray-600"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute right-5">
            <XCircleIcon color="#01ccbd" size={40} />
          </TouchableOpacity>
        </View>

        {/* Delivery Estimate Bar */}
        <View className="flex-row items-center space-x-4 py-3 px-4 bg-white">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7"
          />

          <Text
            className="text-base flex-1"
            style={{ fontFamily: "Quicksand_600SemiBold" }}>
            Deliver in 50 - 75 min
          </Text>

          <TouchableOpacity>
            <Text
              className="text-base text-[#01ccbd]"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* Order Items */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="w-full flex-row items-center space-x-2 bg-white px-4 py-2">
              <Text
                className="text-lg text-[#01ccbd] leading-[18px]"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                {items.length}x
              </Text>

              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="w-9 h-9 rounded-full"
              />

              <Text
                className="text-sm flex-1 leading-[14px]"
                style={{ fontFamily: "Quicksand_600SemiBold" }}>
                {items[0]?.name}
              </Text>

              <Text
                style={{ fontFamily: "Quicksand_700Bold" }}
                className="text-sm text-gray-800 leading-[14px]">
                Rs {items[0]?.price}
              </Text>

              <TouchableOpacity
                className="text-[#01ccbd] mb-[3px] rounded-full"
                onPress={() => dispatch(removeFromBasket({ id: key }))}>
                <MinusCircleIcon color="#01ccbd" size={22} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Order Summary */}
        <View className="bg-white px-5 pb-6 gap-2">
          {/* Sub Total */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              SubTotal
            </Text>
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              Rs {basketTotalPrice}
            </Text>
          </View>

          {/* Delivery Fee */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              Delivery Fee
            </Text>
            <Text
              className="text-gray-500 text-base"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              Rs {89.99}
            </Text>
          </View>

          {/* Order Total Charges */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-base" style={{ fontFamily: "Quicksand_700Bold" }}>
              Order Total
            </Text>
            <Text className="text-base" style={{ fontFamily: "Quicksand_700Bold" }}>
              Rs {basketTotalPrice + 89.99}
            </Text>
          </View>

          {/* Place Order */}
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="p-4 bg-[#01ccbd] rounded-lg">
            <Text
              className="text-white text-center text-lg leading-5"
              style={{ fontFamily: "Quicksand_700Bold" }}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
