import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';

const MONITOR_INTERVAL = 250;

export default function App() {
  const [soundLevel, setSoundLevel] = useState(0);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'This app needs access to your microphone ' +
            'so you can measure sound levels.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        RNSoundLevel.start({
          monitorInterval: MONITOR_INTERVAL,
          samplingRate: 16000,
        });
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
