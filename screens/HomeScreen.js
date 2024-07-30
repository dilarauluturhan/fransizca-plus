import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";

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
    <View className="bg-[#F3F4F6]">
      <View className="flex items-center justify-center gap-4 mt-10 bg-[#F3F4F6]">
        <Text className="text-5xl font-extralight text-center text-[#081b53] mb-7">
          Fransızca
          <Text className="text-red-700 font-light text-5xl">+</Text>
        </Text>
        <SearchArea onSearch={handleSearch} />
      </View>
      {filteredCategories.length === 0 ? (
        <View className="mt-5">
          <Text className="text-lg font-normal text-center text-[#081b53] ">
            Aradığınız sonuç bulunamamıştır...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex items-center place-items-center">
              <TouchableOpacity
                className="border-[0.5px] mt-7 rounded-md w-64 p-1.5 shadow-lg bg-[#081B53]"
                onPress={() =>
                  navigation.navigate("Kaynak Listesi", { category: item })
                }
              >
                <Text className="text-2xl text-center font-light text-white">
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
