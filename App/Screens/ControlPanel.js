import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  TextInput,
} from "react-native";
import { Accelerometer, Gyroscope } from "expo-sensors";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { UserLocationContext } from "../Context/UserLocationContext";
import GlobalApi from "../Services/GlobalApi";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import Colors from "../../assets/Colors/Colors";
import SoundLevel from "react-native-sound-level";
import RNSoundLevel from "react-native-sound-level";

export default function ControlPanel({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const { location, setLocation } = useContext(UserLocationContext);
  const [city, setCity] = useState({});
  const [soundLevel, setSoundLevel] = useState(0);
  const styles = StyleSheet.create({
    listItem: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    colItems: {
      marginHorizontal: 20,
      marginTop: 20,
      padding: 20,
      backgroundColor: isDarkmode ? "#262834" : "white",
      borderRadius: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
    },
    detailsText: {
      marginBottom: 10,
      fontSize: 30,
    },
  });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gyroscopeSubscription, setGyroscopeSubscription] = useState(null);
  const [accelerometerSubscription, setAccelerometerSubscription] =
    useState(null);
  const [accelerationValue, setAccelerationValue] = useState("");
  const [severity, setSeverity] = useState("");
  const [gyroscopeValue, setGyroscopeValue] = useState("");
  const [accidentSeverity, setAccidentSeverity] = useState(null);

  const handleCalculateSeverity = () => {
    const acceleration = parseFloat(accelerationValue);
    const gyroscope = parseFloat(gyroscopeValue);

    // Membership functions and fuzzy logic calculations...
    // Membership functions for linguistic terms
    const membershipLow = (value) => Math.max(0, 1 - Math.abs(value - 5) / 5);
    const membershipMedium = (value) =>
      Math.max(0, 1 - Math.abs(value - 5) / 2);
    const membershipHigh = (value) => Math.max(0, Math.abs(value - 5) / 5);

    // Define fuzzy rules
    const rules = [
      { acceleration: "low", gyroscope: "low", severity: "minor" },
      { acceleration: "medium", gyroscope: "medium", severity: "moderate" },
      { acceleration: "high", gyroscope: "high", severity: "severe" },
      { acceleration: "high", gyroscope: "low", severity: "verySevere" },
      { acceleration: "low", gyroscope: "high", severity: "verySevere" },
      // Add more rules for accuracy
    ];

    // Calculate fuzzy inference
    const inference = rules.map((rule) => {
      let accelerationMembership = membershipLow(accelerationValue);
      let gyroscopeMembership = membershipLow(gyroscopeValue);

      if (rule.acceleration === "medium") {
        accelerationMembership = membershipMedium(accelerationValue);
      } else if (rule.acceleration === "high") {
        accelerationMembership = membershipHigh(accelerationValue);
      }

      if (rule.gyroscope === "medium") {
        gyroscopeMembership = membershipMedium(gyroscopeValue);
      } else if (rule.gyroscope === "high") {
        gyroscopeMembership = membershipHigh(gyroscopeValue);
      }

      const minMembership = Math.min(
        accelerationMembership,
        gyroscopeMembership
      );
      return { severity: rule.severity, membership: minMembership };
    });
    // Helper function to assign weights to severity levels
    const getSeverityValue = (severity) => {
      switch (severity) {
        case "minor":
          setSeverity("minor");
          return 4;
        case "moderate":
          setSeverity("moderate");
          return 7;
        case "severe":
          setSeverity("severe");
          return 10;
        case "verySevere":
          setSeverity("verySevere");
          return 12; // You can adjust this weight as needed
        default:
          return 0;
      }
    };

    // Defuzzify to calculate final accident severity
    const totalWeight = inference.reduce(
      (sum, rule) => sum + rule.membership,
      0
    );
    const weightedSum = inference.reduce(
      (sum, rule) => sum + rule.membership * getSeverityValue(rule.severity),
      0
    );
    const accidentSeverityy = weightedSum / totalWeight;
    // Update the accident severity state with the calculated value
    setAccidentSeverity(accidentSeverityy);
  };
  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(
      location.coords.latitude,
      location.coords.longitude,
      value
    ).then((resp) => {
      setPlaceList(resp.data.results);
      setCity(placeList[0]);
      console.log(placeList[0]);
    });
  };
  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);
  const _sloww = () => Gyroscope.setUpdateInterval(1000);
  const _fastt = () => Gyroscope.setUpdateInterval(16);

  const _subscribeGyroscope = () => {
    setGyroscopeSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroscopeData(gyroscopeData);
      })
    );
  };

  const _subscribeAccelerometer = () => {
    setAccelerometerSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setAccelerometerData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    gyroscopeSubscription && gyroscopeSubscription.remove();
    accelerometerSubscription && accelerometerSubscription.remove();
    setGyroscopeSubscription(null);
    setAccelerometerSubscription(null);
  };
  useEffect(() => {
    if (location) {
      GetNearBySearchPlace("hospital");
    }

    _unsubscribe();
    return () => {
      _subscribeGyroscope();
      _subscribeAccelerometer();
    };
  }, []);
  const sendSMS = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["+94776081348"],
        "🚨 EMERGENCY ALERT: ACCIDENT REPORT 🚨 \n " +
          "Dear Emergency Services, An accident has occurred at the following location\n " +
          " 📍 Latitude: " +
          location.coords.latitude +
          " \n" +
          "📍 Longitude: " +
          location.coords.longitude +
          " \n" +
          "Nearest Hospital :- " +
          placeList[0].name +
          " \n" +
          "Additional Information: The accident involves a car with two people onboard, and there are injuries. We urgently require medical assistance at the provided location.\n" +
          "Please dispatch emergency services to the specified coordinates immediately."
        // {
        //   attachments: {
        //     uri: "path/myfile.png",
        //     mimeType: "image/png",
        //     filename: "myfile.png",
        //   },
        // }
      );
      if (result) {
        console.log("SMS sent: " + JSON.stringify(result));
      }
    } else {
      alert("SMS is not available");
    }
  };
  const sendEmail = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        ["+94776081348"],
        "My sample HelloWorld message"
        // {
        //   attachments: {
        //     uri: "path/myfile.png",
        //     mimeType: "image/png",
        //     filename: "myfile.png",
        //   },
        // }
      );
      if (result) {
        console.log("SMS sent: " + JSON.stringify(result));
      }
    } else {
      alert("SMS is not available");
    }
  };

  return (
    <Layout>
      <TopNav
        middleContent="Control Panel"
        leftContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white : themeColor.dark}
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
      <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View style={styles.listItem}>
            <View style={{ flexDirection: "column", alignItems: "stretch" }}>
              <Text style={styless.text}>
                Accelerometer: (in x: number y: number z: number)
              </Text>
              <Text style={styless.text}>x: {accelerometerData.x}</Text>
              <Text style={styless.text}>y: {accelerometerData.y}</Text>
              <Text style={styless.text}>z: {accelerometerData.z}</Text>
              <View style={styless.buttonContainer}>
                <TouchableOpacity
                  onPress={
                    accelerometerSubscription
                      ? _unsubscribe
                      : _subscribeAccelerometer
                  }
                  style={styless.button}
                >
                  <Text>{accelerometerSubscription ? "On" : "Off"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_slow}
                  style={[styless.button, styless.middleButton]}
                >
                  <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styless.button}>
                  <Text>Fast</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listItem}>
            <View style={{ flexDirection: "column", alignItems: "stretch" }}>
              <Text style={styless.text}>
                Gyroscope: (in x: number y: number z: number)
              </Text>
              <Text style={styless.text}>x: {gyroscopeData.x}</Text>
              <Text style={styless.text}>y: {gyroscopeData.y}</Text>
              <Text style={styless.text}>z: {gyroscopeData.z}</Text>
              <View style={styless.buttonContainer}>
                <TouchableOpacity
                  onPress={
                    gyroscopeSubscription ? _unsubscribe : _subscribeGyroscope
                  }
                  style={styless.button}
                >
                  <Text>{gyroscopeSubscription ? "On" : "Off"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={_sloww}
                  style={[styless.button, styless.middleButton]}
                >
                  <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fastt} style={styless.button}>
                  <Text>Fast</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.listItem}>
            <View
              style={{
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Text style={{ paddingBottom: 10 }}>
                Fuzzy Logic Accident Severity Calculator
              </Text>
              <TextInput
                style={{
                  textAlign: "center",
                  borderColor: isDarkmode ? themeColor.white : themeColor.dark,
                  borderWidth: 5,
                  borderRadius: 15,
                  marginBottom: 10,
                }}
                placeholder="Enter Acceleration Value"
                value={accelerationValue}
                onChangeText={(text) => setAccelerationValue(text)}
                keyboardType="numeric"
              />
              <TextInput
                style={{
                  textAlign: "center",
                  borderColor: isDarkmode ? themeColor.white : themeColor.dark,
                  borderWidth: 5,
                  borderRadius: 15,
                  marginBottom: 10,
                }}
                placeholder="Enter Gyroscope Value"
                value={gyroscopeValue}
                onChangeText={(text) => setGyroscopeValue(text)}
                keyboardType="numeric"
              />
              <Button
                text="Calculate Severity"
                onPress={handleCalculateSeverity}
              />
              {accidentSeverity !== null && (
                <>
                  <Text style={{ textAlign: "center", paddingTop: 10 }}>
                    Accident Severity Value: {accidentSeverity.toFixed(2)}
                  </Text>
                  <Text style={{ textAlign: "center", paddingTop: 10 }}>
                    Accident Severity Level: {severity}
                  </Text>
                </>
              )}
            </View>
          </View>
          <View style={{ flexDirection: "column", alignItems: "stretch" }}>
            <Button
              text={"Get Nearest Hospital"}
              onPress={() => {
                GetNearBySearchPlace("hospital");
                sendSMS();
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />
            <Button
              text={"Get Nearest Police"}
              onPress={() => {
                GetNearBySearchPlace("hospital");
              }}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
              }}
              source={{ uri: city ? city.icon : null }}
            />
            <Text>
              Business Status - {city ? city.business_status : "No Data Yet"}
            </Text>
            <Text>Place Name - {city ? city.name : "No Data Yet"}</Text>
            <Text>Place Address - {city ? city.vicinity : "No Data Yet"}</Text>
            <Text>Place ID - {city ? city.place_id : "No Data Yet"}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
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
    backgroundColor: "white",
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
