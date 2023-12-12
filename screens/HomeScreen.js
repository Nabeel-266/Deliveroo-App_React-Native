import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import client from "../sanity";

// Import HeroIcons
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";

// Import Components
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'featured'] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
    `
      )
      .then((data) => setFeaturedCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="dark" />
      <View className="py-2 rounded-b-3xl bg-white">
        {/* Header */}
        <View className="flex-row items-center mx-3 py-1 space-x-2 ">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7"
          />

          <View className="flex-auto ">
            <Text
              className="text-sm leading-4"
              style={{ fontFamily: "Quicksand_600SemiBold" }}>
              Deliver Now!
            </Text>

            <View className="flex-row items-center space-x-1">
              <Text
                className="text-lg leading-5"
                style={{ fontFamily: "Quicksand_700Bold" }}>
                Current Location
              </Text>

              <Text className="mb-[2px]">
                <ChevronDownIcon color="#01ccbd" size={20} />
              </Text>
            </View>
          </View>

          <View className="p-2 rounded-full bg-slate-200">
            <UserIcon color="#01ccbd" size={20} />
          </View>
        </View>

        {/* Search */}
        <View className="flex flex-row items-center space-x-2 pr-[3px] mx-3 pt-1">
          <View className="flex-1 flex-row items-center space-x-2 px-3 rounded-3xl overflow-hidden bg-slate-200">
            <MagnifyingGlassIcon color="gray" size={20} />
            <TextInput
              style={{ fontFamily: "Quicksand_500Medium" }}
              className="flex-1 py-2 text-base"
              placeholder="Restaurants and cuisines"
              keyboardType="default"
              autoFocus={false}
            />
          </View>

          <AdjustmentsVerticalIcon color="#01ccbd" size={30} className="p-5" />
        </View>
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories?.reverse().map((category) => {
          return (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
