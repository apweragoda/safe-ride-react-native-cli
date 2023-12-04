import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import SoundLevel from 'react-native-sound-level';
import { PermissionsAndroid } from 'react-native';


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

    const [set, isSet] = useState(true);
    const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
    const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0, timestamp: 0 });
    const [soundLevel, setSoundLevel] = useState(0);

    useEffect(() => {
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

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    }
});

export default DrivingScreen;
