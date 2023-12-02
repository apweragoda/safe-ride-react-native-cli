import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        We are a team of passionate developers who love to build amazing apps using React Native.
      </Text>
      <Text style={styles.description}>
        Our goal is to create high-quality, user-friendly apps that make people's lives easier and more enjoyable.
      </Text>
      <Text style={styles.description}>
        If you have any questions or feedback, please don't hesitate to contact us at contact@ourapp.com.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});


export default About