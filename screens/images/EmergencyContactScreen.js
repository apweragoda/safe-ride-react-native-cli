import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {ImageBackground} from 'react-native';

import img from '../images/chs.png';
import img2 from '../images/hum.png';
import img5 from '../images/undraw.png';

const EmergencyContactScreen = () => {
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 12,
              borderRadius: 10,
              marginTop: 30,
              backgroundColor: '#d1a0a7',
            }}>
            <Image source={img2} style={{height: 15, width: 20}} />
          </View>
        </View>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 35,
            paddingTop: 40,
            color: '#FFF',
            fontWeight: 'bold',
          }}>
          Emergency Contacts
        </Text>
        <TouchableOpacity>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.text}>Add Contacts</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF2F2',
            marginTop: 15,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 30,
            paddingLeft: 30,
          }}>
          <View>
            <Text
              style={{
                color: '#345c74',
                fontSize: 20,
                fontFamily: 'Bold',
              }}>
              Name :
            </Text>
            <Text
              style={{
                color: '#345c74',
                fontSize: 20,
                fontFamily: 'Bold',
              }}>
              Mobile Number :
            </Text>
            <View style={styles.container}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f58084',
                  alignItems: 'center',
                  marginTop: 20,
                  width: 150,
                  paddingVertical: 10,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Bold',
                    fontSize: 18,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f58084',
                  alignItems: 'center',
                  marginTop: 20,
                  width: 150,
                  paddingVertical: 10,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Bold',
                    fontSize: 18,
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EmergencyContactScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#345c74',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row', // set flexDirection to 'column'
    
  },
});
