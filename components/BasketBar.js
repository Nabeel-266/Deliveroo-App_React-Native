import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { selectBasketItemsTotalPrice } from "../features/selectors";

const BasketBar = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const basketTotalPrice = useSelector(selectBasketItemsTotalPrice);

  if (!items.length) return null;

  return (
    <View className="absolute bottom-6 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="flex-row items-center justify-between bg-[#01ccbd] mx-4 p-4 rounded-lg">
        <Text
          style={{ fontFamily: "Quicksand_700Bold" }}
          className="text-lg leading-6 text-white px-2 pb-[2px] bg-[#1fada4] rounded-md">
          {items.length}
        </Text>

        <Text
          style={{ fontFamily: "Quicksand_700Bold" }}
          className="flex-1 text-center text-[18px] leading-5 text-white">
          View Basket
        </Text>

        <Text
          style={{ fontFamily: "Quicksand_600SemiBold" }}
          className="text-base leading-[17px] text-white">
          Rs {basketTotalPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketBar;
