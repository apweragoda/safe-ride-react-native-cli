import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Use the Application</Text>
      <Text style={styles.subtitle}>Drive Mode</Text>
      <Text style={styles.description}>
        To start the Drive Mode, simply tap the "Start Drive" button on the home screen. This will enable the Drive Mode and prevent you from using certain features while driving. 
      </Text>
      <Text style={styles.subtitle}>Voice Commands</Text>
      <Text style={styles.description}>
        In the event of an accident, you can use voice commands to handle the application. Simply say "accident" to the application and it will automatically call emergency services and alert your emergency contacts. You can also use voice commands to start and stop the Drive Mode. 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Help;
