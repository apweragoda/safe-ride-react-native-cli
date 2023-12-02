import React, { useState, useContext } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Provider/AuthProvider";
import Home from "./Home";
import MainStack from "../Navigation/MainStack";
import HomeNavigation from "../Navigation/HomeNavigation";
import Colors from "../Shared/Colors";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const navigator = useNavigation();
  // // If the user is authenticated, navigate to the Home screen.

  async function loginFirebase() {
    setLoading(true);
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((user) => {
        console.log("User Logged In Successfully! - " + userEmail);
        setLoading(false);
        navigation.navigate("home-screen");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          setErrortext(error.message);
          Alert.alert("User Login Failed");
        } else if (error.code === "auth/user-not-found") {
          setErrortext("No User Found");
          Alert.alert("No User Found");
        } else {
          setErrortext("Please check your email id or password");
          Alert.alert("Please check your email id or password");
        }
      });
  }

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              marginTop: 0,
              height: 320,
              width: 320,
            }}
            source={require("../../assets/log-in.png")}
          />
        </View>
        <View
          style={{
            flex: 3,
            paddingHorizontal: 20,
            paddingBottom: 20,
            backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
          }}
        >
          <Text
            fontWeight="bold"
            style={{
              alignSelf: "center",
              padding: 30,
            }}
            size="h3"
          >
            Login
          </Text>
          <Text>Email</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Enter your email"
            value={userEmail}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setUserEmail(text)}
          />

          <Text style={{ marginTop: 15 }}>Password</Text>
          <TextInput
            containerStyle={{ marginTop: 15 }}
            placeholder="Enter your password"
            value={userPassword}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setUserPassword(text)}
          />
          <Button
            text={loading ? "Loading" : "Continue"}
            onPress={() => {
              loginFirebase();
            }}
            style={{
              marginTop: 20,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text size="md">Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text
                size="md"
                fontWeight="bold"
                style={{
                  marginLeft: 5,
                }}
              >
                Register here
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Forgot");
              }}
            >
              <Text size="md" fontWeight="bold">
                Forget password
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                isDarkmode ? setTheme("light") : setTheme("dark");
              }}
            >
              <Text
                size="md"
                fontWeight="bold"
                style={{
                  marginLeft: 5,
                }}
              >
                {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
