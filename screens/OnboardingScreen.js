import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "#1F3A8A" : "#B4B4B8";
  return (
    <View
      style={{
        height: 7,
        width: 7,
        marginHorizontal: 3,
        borderRadius: 100,
        backgroundColor,
      }}
    />
  );
};

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginRight: 12 }} {...props}>
    <Text style={{ color: "#1F3A8A", fontSize: 16 }}>Başla!</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginRight: 12 }} {...props}>
    <Text style={{ color: "#1F3A8A", fontSize: 16 }}>Geç</Text>
  </TouchableOpacity>
);

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginLeft: 12 }} {...props}>
    <Text style={{ color: "#1F3A8A", fontSize: 16 }}>Atla</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.navigate("HomeScreen")}
      onDone={() => navigation.navigate("HomeScreen")}
      DotComponent={Dots}
      DoneButtonComponent={Done}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      bottomBarColor="#F3F4F6"
      pages={[
        {
          backgroundColor: "#F3F4F6",
          image: (
            <Image
              source={require("../assets/onboarding.png")}
              className="h-72 w-52"
            />
          ),
          title: "Fransızca+",
        },
        {
          backgroundColor: "#F3F4F6",
          image: (
            <Image
              source={require("../assets/onboardingtwo.png")}
              className="h-56 w-52"
            />
          ),
          title: "Fransızca birçok kaynağa erişim",
        },
        {
          backgroundColor: "#F3F4F6",
          image: (
            <Image
              source={require("../assets/onboardingthree.png")}
              className="h-64 w-52"
            />
          ),
          title: "Zengin içerik kütüphanesi",
        },
      ]}
    />
  );
}
