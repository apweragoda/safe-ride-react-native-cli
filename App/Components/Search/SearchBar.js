import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../assets/Colors/Colors";
export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "raleway-bold", fontSize: 35 }}></Text>
      </View>
      <View
        style={{
          display: "flex",
          marginTop: 5,
          flexDirection: "row",
          padding: 10,
          gap: 5,
          elevation: 10,
          alignItems: "center",
          backgroundColor: Colors.WHITE,
          borderRadius: 5,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.DARK_GRAY} />
        <TextInput
          placeholder="Search"
          style={{ backgroundColor: Colors.WHITE, width: "80%" }}
          onChangeText={(value) => setSearchInput(value)}
          onSubmitEditing={() => setSearchText(searchInput)}
        />
      </View>
    </View>
  );
}
