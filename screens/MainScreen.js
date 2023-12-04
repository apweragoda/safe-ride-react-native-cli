import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {auth} from '../firebase';
import Ionic from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import DrivingScreen from './DrivingScreen';
import ProfileScreen from './ProfileScreen';
import EmergencyContactScreen from './EmergencyContactScreen';
import Help from './Help';
import History from './History';
import About from './About';
import ContactList from './ContactList';
import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import PlaceDetailScreen from '../Components/PlaceDetail/PlaceDetail';

const MainScreen = () => {
  const Tab = createBottomTabNavigator();

  const Stack = createNativeStackNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen name="NearbyPlaces" component={MapScreen} />
        <Stack.Screen name="SearchPlaces" component={SearchScreen} />
        <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen
          name="EmergencyContactScreen"
          component={EmergencyContactScreen}
        />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              size = focused ? size + 18 : size + 5;
            } else if (route.name === 'Drive') {
              iconName = focused ? 'car-sport-sharp' : 'car-sport-outline';
              size = focused ? size + 18 : size + 5;
            }
            if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
              size = focused ? size + 18 : size + 5;
            }
            if (route.name === 'Profile') {
              iconName = focused ? 'md-person' : 'person-outline';
              size = focused ? size + 18 : size + 5;
            }
            return <Ionic name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#DC3545',
          inactiveTintColor: 'black',
          showLabel: false,
          style: {backgroundColor: '#ffc125', Height: 60},
        }}>
        <Tab.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeStack}
        />
        <Tab.Screen
          name="Drive"
          options={{headerShown: false}}
          component={DrivingScreen}
        />
        <Tab.Screen name="Notification" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
