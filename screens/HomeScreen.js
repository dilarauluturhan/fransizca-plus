import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { SquareArrowRight } from "lucide-react-native";

export default function HomeScreen({ navigation }) {
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Kaynak Listesi", { category: item })
            }
          >
            <View className="flex flex-row items-center place-items-center gap-1 mt-2">
              <SquareArrowRight size={26} color="#000000" strokeWidth={1} />
              <Text className="text-2xl">{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
