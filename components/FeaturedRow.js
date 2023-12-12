import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import client from "../sanity";

// Import HeroIcons
import { ArrowSmallRightIcon } from "react-native-heroicons/outline";

// Component
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'featured' &&  _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          },
        }[0]
    `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <View>
      <View className="flex-row items-center justify-between mx-3">
        <Text className="text-lg leading-5" style={{ fontFamily: "Quicksand_700Bold" }}>
          {title}
        </Text>
        <ArrowSmallRightIcon color="#01ccbd" size={25} />
      </View>

      <Text
        className="text-xs leading-[13px] mx-3 text-gray-500"
        style={{ fontFamily: "Quicksand_600SemiBold" }}>
        {description}
      </Text>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          gap: 10,
        }}
        className="py-4"
        horizontal
        showsHorizontalScrollIndicator={false}>
        {/* Restaurant Cards... */}

        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              image={restaurant.image}
              title={restaurant.name}
              ratings={restaurant.rating}
              genre={restaurant.type.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              lng={restaurant.lng}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
