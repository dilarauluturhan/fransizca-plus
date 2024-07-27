import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { CircleArrowRight } from "lucide-react-native";

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(jsonData.map((item) => item.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  return (
    <View>
      <View className="flex items-center justify-center mt-2">
        <Text className="text-2xl text-center text-[#081b53] mb-2">
          Fransızca+
        </Text>
        <SearchArea />
      </View>
      <FlatList
        data={categories}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center place-items-center gap-1 mt-2">
            <CircleArrowRight size={26} color="#000000" strokeWidth={1.25} />
            <Text className="text-2xl">{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
