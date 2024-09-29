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
        size={35}
        strokeWidth={1.25}
        color="#ffffff"
        style={styles.close}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
  },
  searchArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#C7C8CC",
    borderRadius: 7,
    padding: 5,
    paddingLeft: 10,
  },
  close: {
    backgroundColor: "#C7C8CC",
    borderRadius: 7,
    padding: 5,
  },
});
