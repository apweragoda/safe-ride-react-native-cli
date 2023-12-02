import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import ForgetPassword from "../Screens/ForgetPassword";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";
import TabNavigation from "./TabNavigation";

export default function AuthNavigation() {
  const isAndroid = true;
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <AuthStack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Register}
      />
      <AuthStack.Screen
        name="Forgot"
        options={{ headerShown: false }}
        component={ForgetPassword}
      />
      <AuthStack.Screen
        name="home-screen"
        options={{ headerShown: false }}
        component={TabNavigation}
      />
      <AuthStack.Screen
        name="place-detail"
        options={{ title: "" }}
        component={PlaceDetail}
        screenOptions={{
          ...(isAndroid && TransitionPresets.ModalPresentationIOS),

          presentation: "modal",
        }}
      />
    </AuthStack.Navigator>
  );
}
