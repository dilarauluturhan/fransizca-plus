import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import {
  Check,
  SquareArrowRight,
  SquareCheck,
  ArrowRight,
} from "lucide-react-native";
import { useRoute } from "@react-navigation/native";

export default function TopicScreen({ navigation }) {
  const route = useRoute();
  const { category } = route.params;
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    const categoryLinks = jsonData.filter((item) => item.category === category);
    setLinks(categoryLinks);
    setFilteredLinks(categoryLinks);
    navigation.setOptions({ title: category });
  }, [category, navigation]);

  const handleSearch = (text) => {
    const filtered = links.filter((link) =>
      link.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLinks(filtered);
  };

  return (
    <View className="bg-[#F3F4F6]">
      <View className="flex items-center justify-center gap-4 mt-3 bg-[#F3F4F6]">
        <Text className="text-5xl font-extralight text-center text-[#081b53] mb-4">
          Fransızca
          <Text className="text-red-700 font-light text-6xl">+</Text>
        </Text>
        <SearchArea onSearch={handleSearch} />
      </View>
      {filteredLinks.length === 0 ? (
        <View className="mt-5">
          <Text className="text-lg font-normal text-center text-[#081b53] ">
            Aradığınız sonuç bulunamamıştır...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredLinks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
              <View className="flex flex-row items-center place-items-center gap-x-1 w-64 mt-4 ml-12">
                <ArrowRight
                  size={24}
                  color="#FFFFFF"
                  className="bg-[#081b53] rounded-md"
                  strokeWidth={1}
                />
                <Text className="text-xl text-wrap font-normal underline text-blue-600">
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
