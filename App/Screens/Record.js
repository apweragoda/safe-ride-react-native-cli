import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { useTheme } from "react-native-rapi-ui";
import * as Permissions from "expo-permissions";

export default function Record() {
  const [soundLevel, setSoundLevel] = React.useState(0);
  const [recording, setRecording] = React.useState(null);

  React.useEffect(() => {
    askForPermission();
  }, []);

  const askForPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== "granted") {
      alert("Permission to access audio was denied!");
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
  );
}
