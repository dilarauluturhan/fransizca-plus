import { View, Text } from "react-native";
import React from "react";
import SearchArea from "../components/SearchArea";

export default function TopicScreen() {
  return (
    <View>
      <View className="flex items-center justify-center mt-2">
        <Text className="text-2xl text-center text-[#081b53] mb-2">
          Fransızca+
        </Text>
        <SearchArea />
      </View>
    </View>
  );
}
