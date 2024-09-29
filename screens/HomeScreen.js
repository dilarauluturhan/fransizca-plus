import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchArea from "../components/SearchArea";
import jsonData from "../data/data.json";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome5 } from "@expo/vector-icons";

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

  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const getIconForCategory = (category) => {
    const item = jsonData.find((data) => data.category === category);
    return item ? item.icon : "heart";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Fransızca<Text style={styles.plus}>+</Text>
        </Text>
        <Text style={styles.subtitle}>
          Fransızca öğrenme yolculuğuna hoş geldiniz! Çeşitli kaynakları
          keşfetmek için aşağıdan bir kategori seçin veya kategori arayın.
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
                  <FontAwesome5
                    name={getIconForCategory(item)}
                    size={18}
                    color="white"
                  />
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
    fontFamily: "Nunito_400Regular",
    color: "#000",
    textAlign: "center",
  },
  plus: {
    fontSize: 48,
    fontFamily: "Nunito_700Bold",
    color: "#B91C1C",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Nunito_400Regular",
    textAlign: "center",
    marginHorizontal: 4,
    color: "#000",
  },
  noResults: {
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: "Nunito_400Regular",
    color: "#0007",
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  buttonText: {
    fontSize: 19,
    color: "#FFF",
    fontFamily: "Nunito_600SemiBold",
    letterSpacing: 2,
  },
});
