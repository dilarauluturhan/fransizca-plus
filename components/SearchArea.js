import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function SearchArea() {
  return (
    <View className="flex-1 mx-5">
      <TextInput
        placeholder="Kaynak ara..."
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchBox}
        className="placeholder:text-left"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 100,
    paddingVertical: 1,
    borderColor: "#B4B4B8",
    borderWidth: 1,
    borderRadius: 7,
  },
});
