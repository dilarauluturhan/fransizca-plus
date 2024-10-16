import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import TopicScreen from "./screens/TopicScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Kaynak Listesi"
          component={TopicScreen}
          options={({ route }) => ({
            title: route.params.category,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
