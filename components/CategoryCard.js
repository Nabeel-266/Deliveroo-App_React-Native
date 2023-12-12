import { Text, TouchableOpacity, Image, View } from "react-native";
import { urlFor } from "../sanity";

const CategoryCard = ({ image, title }) => {
  return (
    <TouchableOpacity className="relative">
      <View className="h-20 w-24 rounded-lg overflow-hidden bg-[#01ccbd] flex items-end justify-center">
        <Image
          source={{
            uri: urlFor(image).url(),
          }}
          style={{ width: "80%", height: "100%" }}
        />
      </View>
      <Text
        style={{ fontFamily: "Quicksand_700Bold" }}
        className="absolute bottom-1 left-2 text-white font-bold text-sm leading-4">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
