import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import { ArrowRight } from "lucide-react-native";
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Fransızca<Text style={styles.plus}>+</Text>
        </Text>
        <SearchArea onSearch={handleSearch} />
      </View>
      {filteredLinks.length === 0 ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>
            Aradığınız sonuç bulunamamıştır...
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredLinks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                <View style={styles.linkContainer}>
                  <ArrowRight
                    size={24}
                    color="#FFFFFF"
                    style={styles.arrowIcon}
                  />
                  <Text style={styles.linkText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
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
    marginTop: 10,
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
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  arrowIcon: {
    backgroundColor: "#081b53",
    padding: 5,
    borderRadius: 5,
  },
  linkText: {
    fontSize: 18,
    color: "#1e40af",
    marginLeft: 10,
    textDecorationLine: "underline",
  },
});
