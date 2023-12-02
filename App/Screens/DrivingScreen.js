import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import SoundLevel from 'react-native-sound-level';
import { PermissionsAndroid } from 'react-native';
import RNSoundLevel from 'react-native-sound-level';

const MONITOR_INTERVAL = 250;

async function requestMicrophonePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'This app needs access to your microphone',
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
      console.log('Microphone permission granted');
    } else {
      console.log('Microphone permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
setUpdateIntervalForType(SensorTypes.gyroscope, 1000);

const DrivingScreen = () => {

  const [soundLevel, setSoundLevel] = useState(0);

  const [set, isSet] = useState(true);
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });

  const [buttonText, setButtonText] = useState("Start");

  useEffect(() => {
    RNSoundLevel.onNewFrame = (data) => {
      setSoundLevel(data.value);
    };
    requestMicrophonePermission();

    const subscriptionA = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      setAccelerometerData({ x, y, z, timestamp });
    });
    const subscriptionG = gyroscope.subscribe(({ x, y, z, timestamp }) => {
      setGyroscopeData({ x, y, z, timestamp });
    });

    SoundLevel.start((level) => {
      setSoundLevel(level);
    });

    return () => {
      subscriptionA.unsubscribe();
      subscriptionG.unsubscribe();
      SoundLevel.stop();
    }

  }, []);

  const handleButtonPress = () => {
    if (set) {
      setButtonText("Stop");
      isSet(false);
    } else {
      setButtonText("Start");
      isSet(true);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      {!set ? (
        <>
          <Text style={styles.title}>Accelerometer:</Text>
          <Text>x: {accelerometerData.x.toFixed(2)}</Text>
          <Text>y: {accelerometerData.y}</Text>
          <Text>z: {accelerometerData.z}</Text>
          <Text>time: {accelerometerData.timestamp}</Text>
          <Text style={styles.title}>Gyroscope:</Text>
          <Text>x: {gyroscopeData.x.toFixed(2)}</Text>
          <Text>y: {gyroscopeData.y}</Text>
          <Text>z: {gyroscopeData.z}</Text>
          <Text>time: {gyroscopeData.timestamp}</Text>
          <Text style={styles.title}>Sound Level:</Text>
          <Text>{soundLevel.toFixed(2)}</Text>
        </>
      ) : null}
    </View>
  );
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: 200,
        height: 200,
        backgroundColor: '#DC3545',
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '70%',
        left: '30%',
        marginLeft: -10,
        marginTop: -10,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
      },
  });
  

export default DrivingScreen;
