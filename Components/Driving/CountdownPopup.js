/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import Modal from 'react-native-modal';
import Timer from 'react-native-timer';

const CountdownPopup = ({isVisible, onClose}) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isVisible) {
      startCountdown();
    } else {
      resetCountdown();
    }

    return () => {
      Timer.clearTimeout('countdown');
    };
  }, [isVisible]);

  const startCountdown = () => {
    Timer.setInterval(
      'countdown',
      () => {
        if (countdown > 0) {
          setCountdown(prevCountdown => prevCountdown - 1);
          if (countdown === 0) {
            resetCountdown();
            onClose(false); // Close the popup when countdown reaches 0
          }
        } else {
          resetCountdown();
          onClose(false); // Close the popup when countdown reaches 0
        }
      },
      1000,
    );
  };

  const resetCountdown = () => {
    Timer.clearTimeout('countdown');
    setCountdown(10);
  };

  const handleYes = () => {
    resetCountdown();
    onClose(true); // Trigger the "Yes" action
  };

  const handleNo = () => {
    resetCountdown();
    onClose(false); // Trigger the "No" action
  };

  return (
    <Modal isVisible={isVisible}>
      <View>
        <Text>Countdown: {countdown}</Text>
        <Text>Voice Activated: Listening...</Text>
        <Button title="Yes" onPress={handleYes} />
        <Button title="No" onPress={handleNo} />
      </View>
    </Modal>
  );
};

export default CountdownPopup;
