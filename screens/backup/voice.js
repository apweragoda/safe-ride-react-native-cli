import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
const App = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechRecognized = onSpeechRecognizedHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    setStarted('√');
  };

  const onSpeechRecognizedHandler = (e) => {
    setRecognized('√');
  };

  const onSpeechResultsHandler = (e) => {
    setResults(e.value);
    if (e.value.includes('no')) {
      alert('Not an accident');
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
  );
};

export default App;
