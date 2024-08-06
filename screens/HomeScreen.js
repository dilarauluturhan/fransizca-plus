// screens/HomeScreen.js
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Fransızca<Text style={styles.plus}>+</Text>
        </Text>
        <SearchArea onSearch={handleSearch} />
      </View>
      {filteredCategories.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Aradığınız sonuç bulunamamıştır...
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredCategories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.linkContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("Kaynak Listesi", { category: item })
                  }
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 45,
  },
  title: {
    fontSize: 40,
    fontWeight: "200",
    color: "#081b53",
    textAlign: "center",
  },
  plus: {
    fontSize: 48,
    fontWeight: "400",
    color: "#B91C1C",
  },
  noResults: {
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#081b53",
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    borderColor: "#081b53",
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#081B53",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "semibold",
  },
});
