import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Home/Header";
import GoogleMapView from "../Components/Home/GoogleMapView";
import CategoryList from "../Components/Home/CategoryList";
import GlobalApi from "../Services/GlobalApi";
import PlaceList from "../Components/Home/PlaceList";
import { ScrollView } from "react-native";
import { UserLocationContext } from "../Context/UserLocationContext";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import Colors from "../Shared/Colors";
import { Dimensions } from "react-native";
import Login from "./Login";
export default function Home({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const auth = getAuth();
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
  useEffect(() => {
    if (location) {
      GetNearBySearchPlace("car_repair");
    }
  }, [location]);

  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(
      location.coords.latitude,
      location.coords.longitude,
      value
    ).then((resp) => {
      setPlaceList(resp.data.results);
    });
  };
  return (
    <Layout>
      <TopNav
        middleContent="Places"
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isDarkmode ? "#262834" : "white",
        }}
      >
        <ScrollView
          style={{
            padding: 20,
            backgroundColor: isDarkmode ? "#262834" : "white",
            flex: 1,
          }}
        >
          {/* <Header /> */}
          <GoogleMapView placeList={placeList} />
          <CategoryList
            setSelectedCategory={(value) => GetNearBySearchPlace(value)}
          />
          {placeList ? <PlaceList placeList={placeList} /> : null}
        </ScrollView>
      </View>
    </Layout>
  );
}
