import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";
import TabNavigation from "./TabNavigation";
import HomeScreen from "../Screens/HomeScreen";
import HomeNavigation from "./HomeNavigation";

export default function MainStack() {
  const isAndroid = true;
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator
      screenOptions={{
        gestureEnabled: true,

        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <MainStack.Screen
        name="MainTabs"
        options={{ headerShown: false }}
        component={TabNavigation}
      />
      <MainStack.Screen
        name="PlaceDetail"
        options={{ title: "" }}
        component={PlaceDetail}
        screenOptions={{
          presentation: "modal",
        }}
      />
    </MainStack.Navigator>
  );
}
