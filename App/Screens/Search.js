import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GoogleMapViewFull from "../Components/Search/GoogleMapViewFull";
import SearchBar from "../Components/Search/SearchBar";
import { UserLocationContext } from "../Context/UserLocationContext";
import GlobalApi from "../Services/GlobalApi";
import BusinessList from "../Components/Search/BusinessList";
import { Layout, TopNav, themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import Colors from "../../assets/Colors/Colors";
export default function Search({ navigation }) {
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
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
  useEffect(() => {
    GetNearBySearchPlace("hospitals");
  }, []);
  const GetNearBySearchPlace = (value) => {
    GlobalApi.searchByText(value).then((resp) => {
      setPlaceList(resp.data.results);
    });
  };
  return (
    <Layout>
      <TopNav
        middleContent="Discover"
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
        <View style={{ position: "absolute", zIndex: 20 }}>
          <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
        </View>

        <GoogleMapViewFull placeList={placeList} />
        <View
          style={{
            position: "absolute",
            zIndex: 20,
            bottom: 0,
            marginBottom: 90,
          }}
        >
          <BusinessList placeList={placeList} />
        </View>
      </View>
    </Layout>
  );
}
