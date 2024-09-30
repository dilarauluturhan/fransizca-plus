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
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";

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
          <View style={styles.eyeOff}>
            <MaterialCommunityIcons
              name="eye-off-outline"
              size={30}
              color="#0007"
            />
          </View>
          <Text style={styles.noResultsText}>
            Aradığınız kaynak bulunamamıştır.
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
                  <View style={styles.textCont}>
                    <Text style={styles.linkText}>{item.name}</Text>
                    <Text style={styles.linkDesc}>{item.desc}</Text>
                  </View>
                  <FontAwesome5
                    name="external-link-alt"
                    size={16}
                    color="#0007"
                    style={styles.externalLink}
                  />
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
    marginTop: 2,
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
  noResults: {
    marginTop: 20,
  },
  eyeOff: {
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 7,
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: "#C7C8CC",
    borderWidth: 1.5,
  },
  textCont: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  linkText: {
    padding: 5,
    fontSize: 18,
    color: "#000",
    fontFamily: "Nunito_700Bold",
  },
  linkDesc: {
    marginRight: 6,
    paddingHorizontal: 7,
    fontSize: 15,
    fontFamily: "Nunito_500Medium",
    alignItems: "flex-start",
    color: "#000",
  },
  externalLink: {
    alignSelf: "center",
  },
});
