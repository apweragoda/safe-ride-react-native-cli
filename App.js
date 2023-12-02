import React from "react";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import Colors from "./App/Shared/Colors";
import Navigation from "./App/Navigation/Index";
import { LogBox } from "react-native";

import * as Location from "expo-location";
import { UserLocationContext } from "./App/Context/UserLocationContext";
import { ThemeProvider } from "react-native-rapi-ui";
import { AuthProvider } from "./App/Provider/AuthProvider";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
    "raleway-bold": require("./assets/Fonts/Raleway-SemiBold.ttf"),
    "raleway-regular": require("./assets/Fonts/Raleway-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  React.useEffect(() => {
    LogBox.ignoreLogs([
      "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    ]);
  }, []);
  return (
    <ThemeProvider theme="light">
      <View style={styles.container}>
        <UserLocationContext.Provider value={{ location, setLocation }}>
          <AuthProvider>
            {/* <NavigationContainer> */}
            {/* <HomeNavigation /> */}
            <Navigation />
            {/* <TabNavigation /> */}
            {/* </NavigationContainer> */}
          </AuthProvider>
        </UserLocationContext.Provider>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
  },
});
