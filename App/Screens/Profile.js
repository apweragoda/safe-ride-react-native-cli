import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import Voice from "@react-native-voice/voice";
import Colors from "../../assets/Colors/Colors";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import Home from "./Home";
import { Audio } from "expo-av";

export default function Profile({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [recognized, setRecognized] = useState("");
  const [soundLevel, setSoundLevel] = React.useState(0);
  const [recording, setRecording] = React.useState(null);
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);
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

  const askForPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") {
      alert("Permission to access audio was denied!");
    }
  };
  useEffect(() => {
    askForPermission();

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    setStarted("√");
  };

  const onSpeechRecognizedHandler = (e) => {
    setRecognized("√");
  };

  const onSpeechResultsHandler = (e) => {
    setResults(e.value);
    if (e.value.includes("hello")) {
      alert("No Accident Detected");
    }
  };

  const startListeningHandler = async () => {
    setStarted("");
    setRecognized("");
    setResults([]);

    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  };
  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (error) {
      console.error("Error starting recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      analyzeSound(uri);
      setRecording(null);
    } catch (error) {
      console.error("Error stopping recording", error);
    }
  };

  const analyzeSound = async (uri) => {
    try {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      if (status === "ERROR") {
        console.error("Error loading sound", status);
        return;
      }

      await sound.setVolumeAsync(1.0);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          // Calculate decibel levels (this is a simplistic example, not a precise measurement)
          const decibels = 20 * Math.log10(status.volume);
          setSoundLevel(decibels);
          //   console.log(soundLevel);
          console.log(status.volume);
        }
      });

      // Stop playing after a few seconds (adjust as needed)
      setTimeout(async () => {
        await sound.stopAsync();
        await sound.unloadAsync();
      }, 5000);
    } catch (error) {
      console.error("Error analyzing sound", error);
    }
  };
  return (
    <Layout style={{ marginTop: 0 }}>
      <TopNav
        middleContent="Profile"
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={startListeningHandler}>
          <Text style={{ fontSize: 25 }}>Press to Speak</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, marginVertical: 10 }}>
          {recognized}
          {started}
        </Text>
        <Text style={{ fontSize: 20 }}>
          {results.map((result, index) => (
            <Text key={`result-${index}`}>{result}</Text>
          ))}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sound Level: {soundLevel.toFixed(2)} dB</Text>
        <Button
          title="Start Recording"
          onPress={startRecording}
          disabled={recording !== null}
        />
        <Button
          title="Stop Recording"
          onPress={stopRecording}
          disabled={recording === null}
        />
      </View>
    </Layout>
  );
}
