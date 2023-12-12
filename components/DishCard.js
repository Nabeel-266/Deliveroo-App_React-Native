import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { urlFor } from "../sanity";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  // selectBasketItemsWithEachItemId,
} from "../features/basketSlice";
import { selectBasketItemsWithEachItemId } from "../features/selectors";

// Import HeroIcons
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const DishCard = ({ id, name, description, price, serve, image }) => {
  const [isPressedItem, setIsPressedItem] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithEachItemId(state, id));

  // Add Item in to Basket
  const addItemInToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, serve, image }));
  };

  // Remove Item from Basket
  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressedItem(!isPressedItem)}
        className={`bg-white border border-gray-300 ${isPressedItem && "border-b-0"}`}>
        <View className="px-3 py-4 flex-row items-center space-x-2">
          <View className="flex-1 pr-2">
            <Text className="text-lg" style={{ fontFamily: "Quicksand_600SemiBold" }}>
              {name}
            </Text>

            <Text className="text-xs" style={{ fontFamily: "Quicksand_500Medium" }}>
              {description}
            </Text>

            <View className="flex-row items-center space-x-3 mt-2">
              <Text className="text-sm" style={{ fontFamily: "Quicksand_600SemiBold" }}>
                Rs {price}
              </Text>

              <Text>|</Text>

              <Text className="text-sm" style={{ fontFamily: "Quicksand_500Medium" }}>
                <Text className="font-bold">Serve</Text> - {serve}
              </Text>
            </View>
          </View>

          <View className="p-4">
            <Image
              source={{
                uri: urlFor(image).url(),
              }}
              className="w-16 h-16"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressedItem && (
        <View>
          <View className="flex-row items-center space-x-3 px-3 pb-2 bg-white border-x border-gray-300">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon color={items.length ? "#01ccbd" : "gray"} size={34} />
            </TouchableOpacity>

            <Text
              className="text-xl leading-6"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              {items.length}
            </Text>

            <TouchableOpacity onPress={addItemInToBasket}>
              <PlusCircleIcon color="#01ccbd" size={34} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishCard;
