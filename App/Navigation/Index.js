import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getApps, initializeApp } from "firebase/app";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Utils/Loading";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import HomeNavigation from "./HomeNavigation";
import AuthNavigation from "./AuthNavigation";
import Auth from "./AuthNavigation";
import TabNavigation from "./TabNavigation";
import MainStack from "./MainStack";
import HomeScreen from "../Screens/HomeScreen";
// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyAKiDDG3AWrDynp7poWJj_rteA85vQl4Ik",
  authDomain: "safe-ride-90fca.firebaseapp.com",
  projectId: "safe-ride-90fca",
  storageBucket: "safe-ride-90fca.appspot.com",
  messagingSenderId: "16571767948",
  appId: "1:16571767948:web:c8a2971769b3cd9670afa9",
  measurementId: "G-NT7JGGZ7VF",
};
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <AuthNavigation />}
      {user == false && <AuthNavigation />}
      {user == true && <TabNavigation />}
    </NavigationContainer>
  );
};
