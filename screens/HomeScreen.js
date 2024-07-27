import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { SquareArrowRight } from "lucide-react-native";

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(jsonData.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
    setFilteredCategories(uniqueCategories);
  }, []);

  const handleSearch = (text) => {
    const filtered = categories.filter((category) =>
      category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <View>
      <View className="flex items-center justify-center gap-4 mt-6">
        <Text className="text-4xl text-center text-[#081b53] mb-4">
          Fransızca+
        </Text>
        <SearchArea onSearch={handleSearch} />
      </View>
      <FlatList
        data={filteredCategories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex items-center place-items-center">
            <TouchableOpacity
              className="border border-[#081b53] mt-4 mb-2 rounded-md w-72 p-1.5 shadow-lg"
              onPress={() =>
                navigation.navigate("Kaynak Listesi", { category: item })
              }
            >
              <Text className="text-2xl text-center">{item}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
