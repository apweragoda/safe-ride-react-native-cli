import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import SoundLevel from 'react-native-sound-level';
import {PermissionsAndroid} from 'react-native';
import RNSoundLevel from 'react-native-sound-level';
import GlobalApi from '../Services/GlobalApi';
import {UserLocationContext} from '../Context/UserLocationContext';
import SendSMS from 'react-native-sms';
import CountdownPopup from '../Components/Driving/CountdownPopup';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms
setUpdateIntervalForType(SensorTypes.gyroscope, 1000);

const DrivingScreen = () => {
  const [soundLevel, setSoundLevel] = useState(0);
  const [placeList, setPlaceList] = useState([]);
  const [city, setCity] = useState({});
  const {location, setLocation} = useContext(UserLocationContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [set, isSet] = useState(true);
  const [accelerometerData, setAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0,
  });
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0,
  });

  const [buttonText, setButtonText] = useState('Start');
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [accelerationValue, setAccelerationValue] = useState('');
  const [severity, setSeverity] = useState('');
  const [gyroscopeValue, setGyroscopeValue] = useState('');
  const [accidentSeverity, setAccidentSeverity] = useState(null);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getSavedContacts = async () => {
      try {
        const savedContactsJson = await AsyncStorage.getItem(
          'selectedContacts',
        );
        if (savedContactsJson !== null) {
          const savedContacts = JSON.parse(savedContactsJson);
          console.log(
            'Selected contacts retrieved from local storage:',
            savedContacts,
          );
          setContacts(savedContacts);
        } else {
          console.log('No selected contacts found in local storage');
        }
      } catch (error) {
        console.log(
          'Error retrieving selected contacts from local storage:',
          error,
        );
      }
    };

    getSavedContacts();

    RNSoundLevel.onNewFrame = data => {
      setSoundLevel(data.value);
    };
    requestMicrophonePermission();

    const subscriptionA = accelerometer.subscribe(({x, y, z, timestamp}) => {
      setAccelerometerData({x, y, z, timestamp});
    });
    const subscriptionG = gyroscope.subscribe(({x, y, z, timestamp}) => {
      setGyroscopeData({x, y, z, timestamp});
    });

    SoundLevel.start(level => {
      setSoundLevel(level);
    });

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);

      // subscription.unsubscribe();
      subscriptionA.unsubscribe();
      subscriptionG.unsubscribe();
      SoundLevel.stop();
    };
  }, []);

  const handleCalculateSeverity = () => {
    const acceleration = accelerometerData;
    const gyroscope = gyroscopeData;
    const microphone = soundLevel;

    // Membership functions and fuzzy logic calculations...
    // Membership functions for linguistic terms
    const membershipLow = value => Math.max(0, 1 - Math.abs(value - 5) / 5);
    const membershipMedium = value => Math.max(0, 1 - Math.abs(value - 5) / 2);
    const membershipHigh = value => Math.max(0, Math.abs(value - 5) / 5);
    const membershipVeryHigh = value => Math.max(0, Math.abs(value - 5) / 2);
    const membershipVeryLow = value => Math.max(0, 1 - Math.abs(value - 5) / 2);

    // Define fuzzy rules
    const rules = [
      {
        acceleration: 'low',
        gyroscope: 'low',
        microphone: 'veryLow',
        severity: 'minor',
      },
      {
        acceleration: 'medium',
        gyroscope: 'medium',
        microphone: 'low',
        severity: 'moderate',
      },
      {
        acceleration: 'high',
        gyroscope: 'high',
        microphone: 'medium',
        severity: 'severe',
      },
      {
        acceleration: 'high',
        gyroscope: 'low',
        microphone: 'veryHigh',
        severity: 'verySevere',
      },
      {
        acceleration: 'low',
        gyroscope: 'high',
        microphone: 'veryHigh',
        severity: 'verySevere',
      },
      {
        acceleration: 'veryHigh',
        gyroscope: 'veryHigh',
        microphone: 'veryLow',
        severity: 'veryLow',
      },
      {
        acceleration: 'veryHigh',
        gyroscope: 'high',
        microphone: 'veryHigh',
        severity: 'veryHigh',
      },
      {
        acceleration: 'veryHigh',
        gyroscope: 'high',
        microphone: 'high',
        severity: 'veryHigh',
      },
      {
        acceleration: 'high',
        gyroscope: 'veryHigh',
        microphone: 'veryHigh',
        severity: 'veryHigh',
      },
      {
        acceleration: 'high',
        gyroscope: 'veryHigh',
        microphone: 'high',
        severity: 'high',
      },
    ];

    // Calculate fuzzy inference
    const inference = rules.map(rule => {
      let accelerationMembership = membershipLow(accelerationValue);
      let gyroscopeMembership = membershipLow(gyroscopeValue);
      let microphoneMembership = membershipLow(soundLevel);

      // Adjust membership functions based on linguistic terms
      if (rule.acceleration === 'medium') {
        accelerationMembership = membershipMedium(accelerationValue);
      } else if (rule.acceleration === 'high') {
        accelerationMembership = membershipHigh(accelerationValue);
      } else if (rule.acceleration === 'veryHigh') {
        accelerationMembership = membershipVeryHigh(accelerationValue);
      }

      if (rule.gyroscope === 'medium') {
        gyroscopeMembership = membershipMedium(gyroscopeValue);
      } else if (rule.gyroscope === 'high') {
        gyroscopeMembership = membershipHigh(gyroscopeValue);
      } else if (rule.gyroscope === 'veryHigh') {
        gyroscopeMembership = membershipVeryHigh(gyroscopeValue);
      }

      if (rule.microphone === 'medium') {
        microphoneMembership = membershipMedium(soundLevel);
      } else if (rule.microphone === 'high') {
        microphoneMembership = membershipHigh(soundLevel);
      } else if (rule.microphone === 'veryHigh') {
        microphoneMembership = membershipVeryHigh(soundLevel);
      } else if (rule.microphone === 'veryLow') {
        microphoneMembership = membershipVeryLow(soundLevel);
      }
      const minMembership = Math.min(
        accelerationMembership,
        gyroscopeMembership,
        microphoneMembership,
      );

      return {severity: rule.severity, membership: minMembership};
    });
    // Helper function to assign weights to severity levels
    const getSeverityValue = severity => {
      switch (severity) {
        case 'minor':
          setSeverity('minor');
          return 4;
        case 'moderate':
          setSeverity('moderate');
          return 7;
        case 'severe':
          setSeverity('severe');
          return 10;
        case 'high':
          setSeverity('high');
          return 12;
        case 'veryHigh':
          setSeverity('veryHigh');
          return 15;
        case 'veryLow':
          setSeverity('veryLow');
          return 3;
        default:
          return 0;
      }
    };

    // Defuzzify to calculate final accident severity
    const totalWeight = inference.reduce(
      (sum, rule) => sum + rule.membership,
      0,
    );
    const weightedSum = inference.reduce(
      (sum, rule) => sum + rule.membership * getSeverityValue(rule.severity),
      0,
    );

    const accidentSeverityy = weightedSum / totalWeight;

    // Update the accident severity state with the calculated value
    setAccidentSeverity(accidentSeverityy);
  };

  const onSpeechStartHandler = e => {
    setStarted('√');
  };

  const onSpeechRecognizedHandler = e => {
    setRecognized('√');
  };

  const onSpeechResultsHandler = e => {
    setResults(e.value);
    if (e.value.includes('no')) {
      alert('No Accident Detected');
      console.log('No Accident Detected');
    }
    if (e.value.includes('yes')) {
      sendSMS();
      alert('Accident Detected');
      console.log('Accident Detected');
    }
  };

  const startListeningHandler = async () => {
    setStarted('');
    setRecognized('');
    setResults([]);

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };
  const GetNearBySearchPlace = value => {
    GlobalApi.nearByPlace(location.latitude, location.longitude, value).then(
      resp => {
        setPlaceList(resp.data.results);
        setCity(placeList[0]);
        console.log(placeList[0]);
      },
    );
  };

  const sendSMS = () => {
    const message =
      '🚨 EMERGENCY ALERT: ACCIDENT REPORT 🚨 \n ' +
      'Accident Severity - ' +
      accidentSeverity +
      ' - ' +
      severity +
      ' ' +
      '\n ' +
      'Dear Emergency Services, An accident has occurred at the following location\n ' +
      'Current Location: https://maps.google.com/?q=' +
      location.latitude +
      ',' +
      location.longitude +
      '\n' +
      ' 📍 Latitude: ' +
      location.latitude +
      ' \n' +
      '📍 Longitude: ' +
      location.longitude +
      ' \n' +
      'Nearest Hospital :- ' +
      placeList[0].name +
      ' \n' +
      'Additional Information: The accident involves a car with two people onboard, and there are injuries. We urgently require medical assistance at the provided location.\n' +
      'Please dispatch emergency services to the specified coordinates immediately.';
    console.log(
      'Sending... to ' +
        contacts.length +
        ' contacts - ' +
        contacts[0].displayName +
        ' - ' +
        contacts[0].phoneNumbers,
    );
    console.log(message);
    SendSMS.send(
      [contacts[0].phoneNumbers], // Replace with the recipient's phone number
      message,
      (completed, cancelled, error) => {
        console.log('SMS Sent Completed:', completed);
        console.log('SMS Sent Cancelled:', cancelled);
        console.log('SMS Sent Error:', error);
      },
    );
  };

  const handleShowPopup = () => {
    setIsPopupVisible(true);
    startListeningHandler();
  };

  const handleClosePopup = isYes => {
    setIsPopupVisible(false);
    if (isYes) {
      handleCalculateSeverity();
      console.log('User clicked Yes');
      console.log('Accident Detected');
      alert('Accident Detected \n Accident Severity : ' + severity);
      console.log(accidentSeverity);
      sendSMS();
    } else {
      // Handle "No" action or countdown reaching 0
      console.log('User clicked No or countdown reached 0');
      alert('No Accident Detected');
      console.log('No Accident Detected');
    }
  };

  const handleButtonPress = () => {
    if (location) {
      GetNearBySearchPlace('hospital');
    }
    if (set) {
      setButtonText('Stop');
      isSet(false);
    } else {
      setButtonText('Start');
      isSet(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      {!set ? (
        <>
          <View style={styles.box}>
            <Text style={styles.title2}>REAL TIME SENSOR DATA</Text>
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

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button2}
                onPress={handleShowPopup}>
                <Text style={styles.buttonText}>Manual</Text>
                <Image
                  source={require('../assests/switch-on.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={sendSMS}>
                <Text style={styles.buttonText}>Manual</Text>
                <Image
                  source={require('../assests/switch-off.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <CountdownPopup
                isVisible={isPopupVisible}
                onClose={handleClosePopup}
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop: -250,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: '#DC3545',
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '70%',
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
  title2: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    borderColor: 'red',
    borderRadius: 10,
    textAlign: 'center',
    borderWidth: 5,
    padding: 5,
    backgroundColor: 'red',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button2: {
    margin: 10,
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
});

export default DrivingScreen;
