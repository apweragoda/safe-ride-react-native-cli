import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';

const MONITOR_INTERVAL = 250;

const requestPermission = async () => {
  // request permission to access microphone
  // ...
  if (success) {
    RNSoundLevel.start({
      monitorInterval: MONITOR_INTERVAL,
      samplingRate: 16000,
    });
  }
};

export default function App() {
  const [soundLevel, setSoundLevel] = useState(0);

  useEffect(() => {
    RNSoundLevel.onNewFrame = (data) => {
      setSoundLevel(data.value);
    };

    requestPermission();

    return () => {
      RNSoundLevel.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sound Level: {soundLevel.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
