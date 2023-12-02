import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Carousel from "../Shared/Carousel";
import { dummyData } from "../Shared/Data";
import { Layout, TopNav, themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Shared/Colors";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

const Button = ({ title, image, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const { isDarkmode, setTheme } = useTheme();
  const styless = StyleSheet.create({
    logo: {
      width: 50,
      height: 50,
    },
    searchBar: {
      borderWidth: 3.5,
      borderColor: Colors.BLACK,
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
    container: {
      backgroundColor: isDarkmode ? "#262834" : "white",
    },
  });
  return (
    <>
      <Layout>
        <TopNav
          middleContent="Home"
          leftContent={
            <Ionicons
              name={isDarkmode ? "sunny" : "moon"}
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          }
          rightContent={
            <Image
              source={require("./../../assets/user.png")}
              style={styless.userImage}
            />
          }
          leftAction={() => {
            if (isDarkmode) {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
          rightAction={() => {
            signOut(auth);
            console.log("User Logged out");
            alert("User Logged out");
            navigation.navigate("Login");
          }}
        />
        <View>
          <Carousel data={dummyData} />
          {/* <Text
            style={{
              fontSize: 30,
              color: "#333",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome
          </Text> */}
        </View>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.row}>
              <Button
                title="Nearby Places"
                image={require("../../assets/places.png")}
                onPress={() => navigation.navigate("Places")}
              />
              <Button
                title="Search Places"
                image={require("../../assets/search.png")}
                onPress={() => navigation.navigate("Search")}
              />
            </View>
            <View style={styles.row}>
              <Button
                title="Manage Contacts"
                image={require("../../assets/contact.png")}
                onPress={() => {
                  navigation.navigate("ContactList");
                }}
              />
              <Button
                title="History"
                image={require("../../assets/history.png")}
                onPress={() => navigation.navigate("History")}
              />
            </View>
            <View style={styles.row}>
              <Button
                title="Help Center"
                image={require("../../assets/help.png")}
                onPress={() => navigation.navigate("Help")}
              />
              <Button
                title="About Us"
                image={require("../../assets/about.png")}
                onPress={() => navigation.navigate("About")}
              />
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  button: {
    margin: 10,
    width: 160,
    height: 150,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1.5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
