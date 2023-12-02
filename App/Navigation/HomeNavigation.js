import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";
import HomeScreen from "../Screens/HomeScreen";
import ContactList from "../Screens/ContactList";
import History from "../Screens/History";
import Help from "../Screens/Help";
import About from "../Screens/About";
import EmergencyContactScreen from "../Screens/EmergencyContactScreen";
import TabNavigation from "./TabNavigation";

export default function HomeNavigation() {
  const isAndroid = true;
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
    // screenOptions={{
    //   gestureEnabled: true,

    //   ...(isAndroid && TransitionPresets.ModalPresentationIOS),
    // }}
    >
      <MainStack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={HomeScreen}
      />

      <MainStack.Screen
        name="ContactList"
        options={{ headerShown: false }}
        component={ContactList}
      />
      <MainStack.Screen
        name="History"
        options={{ headerShown: false }}
        component={History}
      />
      <MainStack.Screen
        name="Help"
        options={{ headerShown: false }}
        component={Help}
      />
      <MainStack.Screen
        name="About"
        options={{ headerShown: false }}
        component={About}
      />
      <MainStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <MainStack.Screen
        name="EmergencyContactScreen"
        options={{ headerShown: false }}
        component={EmergencyContactScreen}
      />
      <MainStack.Screen
        name="place-detail"
        options={{ title: "" }}
        component={PlaceDetail}
        screenOptions={{
          presentation: "modal",
        }}
      />
    </MainStack.Navigator>
  );
}
