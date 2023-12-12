import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import client from "../sanity";

// Component
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type == 'category']
    `
      )
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 12,
        gap: 10,
      }}
      className="pt-2 pb-4"
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map((category) => {
        return (
          <CategoryCard key={category._id} image={category.image} title={category.name} />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
