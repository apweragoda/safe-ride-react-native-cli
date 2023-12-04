import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Carousel from './Carousel';
import {dummyData} from './Data';
import colors from './colors';

const Button = ({title, image, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
  return (
    <>
      <ScrollView>
        <View>
          <Carousel data={dummyData} />
          <Text
            style={{
              fontSize: 30,
              color: '#333',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 15,
            }}>
            Welcome
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Button
              title="Nearby Places"
              image={require('../assests/places.png')}
              onPress={() => {
                navigation.navigate('NearbyPlaces');
              }}
            />
            <Button
              title="Search Places"
              image={require('../assests/search.png')}
              onPress={() => {
                navigation.navigate('SearchPlaces');
              }}
            />
          </View>
          <View style={styles.row}>
            <Button
              title="Manage Contacts"
              image={require('../assests/contact.png')}
              onPress={() => {
                navigation.navigate('ContactList');
              }}
            />
            <Button
              title="History"
              image={require('../assests/history.png')}
              onPress={() => navigation.navigate('History')}
            />
          </View>
          <View style={styles.row}>
            <Button
              title="Help Center"
              image={require('../assests/help.png')}
              onPress={() => navigation.navigate('Help')}
            />
            <Button
              title="About Us"
              image={require('../assests/about.png')}
              onPress={() => navigation.navigate('About')}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    margin: 10,
    width: 160,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1.5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
