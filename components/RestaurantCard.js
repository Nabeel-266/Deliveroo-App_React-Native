import { View, Text, TouchableOpacity, Image } from "react-native";
import { urlFor } from "../sanity";

// Import HeroIcons
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantCard = ({
  id,
  image,
  title,
  ratings,
  genre,
  address,
  short_description,
  dishes,
  lng,
  lat,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressHandler = () => {
    dispatch(
      setRestaurant({
        id,
        image,
        title,
        ratings,
        genre,
        address,
        short_description,
        dishes,
        lng,
        lat,
      })
    );
    navigation.navigate(
      "Restaurant"
      // , {
      //   id,
      //   image,
      //   title,
      //   ratings,
      //   genre,
      //   address,
      //   short_description,
      //   dishes,
      //   lng,
      //   lat,
      // }
    );
  };

  return (
    <TouchableOpacity
      className="bg-white shadow rounded-md overflow-hidden"
      onPress={onPressHandler}>
      <Image
        source={{
          uri: urlFor(image).url(),
        }}
        className="w-60 h-36 object-cover"
      />

      <View className="gap-[3px] px-3 py-3 w-60">
        <Text
          className="text-[17px] leading-4"
          style={{ fontFamily: "Quicksand_700Bold" }}>
          {title}
        </Text>

        <View className="flex-row items-center space-x-2 mb-0">
          <StarIcon color="#01ccbd" size={20} />
          <Text
            className="text-[13.5px] text-gray-700"
            style={{ fontFamily: "Quicksand_500Medium" }}>
            <Text className="text-[#01ccbd]">{ratings}</Text> . {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2 w-100">
          <MapPinIcon color="gray" size={20} />
          <Text
            className="text-[13.5px] text-gray-700"
            style={{ fontFamily: "Quicksand_500Medium" }}>
            {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
