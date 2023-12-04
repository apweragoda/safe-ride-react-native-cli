import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone',
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
    };
    getPermission();

    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    setStarted('√');
  };

  const onSpeechRecognizedHandler = e => {
    setRecognized('√');
  };

  const onSpeechResultsHandler = e => {
    setResults(e.value);
    if (e.value.includes('no')) {
      console.log('Detected', e.value);
      alert('No Accident Detected');
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

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={startListeningHandler}>
        <Text style={{fontSize: 25}}>Press to Speak</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20, marginVertical: 10}}>
        {recognized}
        {started}
      </Text>
      <Text style={{fontSize: 20}}>
        {results.map((result, index) => (
          <Text key={`result-${index}`}>{result}</Text>
        ))}
      </Text>
    </View>
  );
};

export default App;
