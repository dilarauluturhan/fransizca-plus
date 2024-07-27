import { View, Text, FlatList, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { SquareArrowRight } from "lucide-react-native";

export default function TopicScreen({ route }) {
  const { category } = route.params;
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const categoryLinks = jsonData.filter((item) => item.category === category);
    setLinks(categoryLinks);
  }, [category]);

  return (
    <View>
      <View className="flex items-center justify-center mt-2">
        <Text className="text-2xl text-center text-[#081b53] mb-2">
          Fransızca+
        </Text>
        <SearchArea />
      </View>
      <FlatList
        data={links}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
            <View className="flex flex-row items-center place-items-center gap-1 mt-2">
              <SquareArrowRight size={26} color="#000000" strokeWidth={1} />
              <Text className="text-xl">{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
