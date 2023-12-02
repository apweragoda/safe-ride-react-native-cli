import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { isDarkmode, setTheme } = useTheme();
  const styless = StyleSheet.create({
    logo: {
      width: 50,
      height: 50,
    },
    searchBar: {
      borderWidth: 3.5,
      borderColor: isDarkmode ? "#262834" : "white",
      padding: 4,
      borderRadius: 50,
      paddingLeft: 10,
      width: Dimensions.get("screen").width * 0.53,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  });
  const styles = StyleSheet.create({
    listItem: {
      marginHorizontal: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    colItems: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    detailsText: {
      marginBottom: 10,
      fontSize: 30,
    },
  });
  return (
    <View style={styles.listItem}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            borderWidth: 3.5,
            fontSize: 20,
            borderColor: isDarkmode ? "#262834" : "white",
            padding: 4,
            borderRadius: 50,
            paddingLeft: 10,
            width: Dimensions.get("screen").width * 0.7,
          }}
          placeholder="Search here"
        />
        <Ionicons
          style={{ marginLeft: -48, marginTop: 7 }}
          name="search"
          size={60}
          color={isDarkmode ? themeColor.white : themeColor.black}
        />
      </View>
    </View>
  );
}
