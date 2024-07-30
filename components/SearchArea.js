import { View, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { X } from "lucide-react-native";

export default function SearchArea({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Kaynak ara..."
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchArea}
      />

      <X
        onPress={clearSearch}
        size={30}
        strokeWidth={1.25}
        color="#ffffff"
        style={styles.close}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginLeft: 13,
  },
  searchArea: {
    borderWidth: 1,
    borderColor: "#C7C8CC",
    borderRadius: 7,
    width: 220,
    padding: 2,
    paddingLeft: 5,
  },
  close: {
    backgroundColor: "#C7C8CC",
    borderRadius: 7,
  },
});
