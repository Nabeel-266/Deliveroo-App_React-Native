import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { urlFor } from "../sanity";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
// import { getSelectedRestaurant } from "../features/selectors";

// Import HeroIcons
import {
  ArrowLeftIcon,
  MapPinIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";

// Components
import DishCard from "../components/DishCard";
import BasketBar from "../components/BasketBar";

const RestaurantScreen = ({ navigation }) => {
  const restaurant = useSelector(selectRestaurant);
  const { image, title, ratings, genre, address, short_description, dishes } = restaurant;

  // const {
  //   params: {
  //     id,
  //     image,
  //     title,
  //     ratings,
  //     genre,
  //     address,
  //     short_description,
  //     dishes,
  //     lng,
  //     lat,
  //   },
  // } = useRoute();

  return (
    <>
      <View>
        <StatusBar style="light" />

        {/* Restaurant Image */}
        <View className="relative">
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            className="w-100 h-56 bg-gray-300 object-cover"
          />

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-10 left-4 p-1 bg-gray-100 rounded-full">
            <ArrowLeftIcon color="#01ccbd" size={24} />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <ScrollView className="mb-44">
          {/* Restaurant About  */}
          <View className="bg-white shadow-md shadow-gray-600">
            <View className="p-3 space-y-2">
              <Text
                className="text-[26px] leading-7"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                {title}
              </Text>

              <View className="flex-row items-center space-x-2">
                <View className="flex-row items-center space-x-1">
                  <StarIcon color="#01ccbd" size={20} />
                  <Text
                    className="text-sm leading-4 text-gray-800 text-"
                    style={{ fontFamily: "Quicksand_500Medium" }}>
                    <Text className="text-[#01ccbd] font-extrabold">{ratings}</Text> .{" "}
                    {genre}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1 w-100">
                  <MapPinIcon color="gray" size={20} />
                  <Text
                    className="text-sm leading-4 font-medium text-gray-800"
                    style={{ fontFamily: "Quicksand_500Medium" }}>
                    {address}
                  </Text>
                </View>
              </View>

              <Text
                style={{ fontFamily: "Quicksand_500Medium" }}
                className="text-md font-medium text-gray-800">
                {short_description}
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center space-x-3 p-3 border-y border-gray-300">
              <QuestionMarkCircleIcon color="gray" size={25} />
              <Text
                className="text-md flex-1 text-gray-700"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                Have a food allergy?
              </Text>
              <ChevronRightIcon color="#01ccbd" size={22} />
            </TouchableOpacity>
          </View>

          {/* Restaurant Menu */}
          <View className="pt-4 pb-36">
            <Text
              style={{ fontFamily: "Quicksand_700Bold" }}
              className="text-lg leading-5 px-3 mb-2">
              Menu
            </Text>

            {/* DishCards */}
            {dishes.map((dish) => {
              return (
                <DishCard
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  description={dish.short_description}
                  price={dish.price}
                  serve={dish.serve}
                  image={dish.image}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <BasketBar />
    </>
  );
};

export default RestaurantScreen;
