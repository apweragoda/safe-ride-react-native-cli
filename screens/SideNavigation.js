import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView,Image,TextInput} from 'react-native';
import {ImageBackground} from 'react-native';

import img from '../images/chs.png';
import img2 from '../images/hum.png';

const SideNavigation = () => {
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
          <Image
            source={img2}
            style={{height: 15, width: 20}}
          />
        </View>
      </View>
      <Text
        style={{
          paddingHorizontal: 20,
          fontSize: 35,
          paddingTop: 40,
          fontFamily:'Bold',
          color: '#FFF',
        }}>
        Welcome back 
      </Text>

    </ScrollView>

  </ImageBackground>
  )
}

export default SideNavigation