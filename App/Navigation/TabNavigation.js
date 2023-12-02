import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../Screens/Search";
import Profile from "../Screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigation from "./HomeNavigation";
import ControlPanel from "../Screens/ControlPanel";
import Home from "../Screens/Home";
import { themeColor, useTheme } from "react-native-rapi-ui";
import HomeScreen from "../Screens/HomeScreen";
import Record from "../Screens/Record";
export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const { isDarkmode } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Main",
          tabBarStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Places"
        component={Home}
        options={{
          tabBarLabel: "Places",
          tabBarStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Control"
        component={ControlPanel}
        options={{
          tabBarLabel: "Control Panel",
          tabBarStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="build" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
