import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import EmergencyContactScreen from './screens/EmergencyContactScreen';
import Help from './screens/Help';
import History from './screens/History';
import About from './screens/About';
import ContactList from './screens/ContactList';
import RegistrationScreen from './screens/RegistrationScreen';
import MapScreen from './screens/MapScreen';
import {UserLocationContext} from './Context/UserLocationContext';
import {Dimensions, PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import SearchScreen from './screens/SearchScreen';
import PlaceDetailScreen from './Components/PlaceDetail/PlaceDetail';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [location, setLocation] = useState({});

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow Location Permission',
            message: 'Safe-Ride app needs access to your location ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location permission');
          GetCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);

  function GetCurrentLocation() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(currentLocation => {
        console.log(currentLocation);
        setLocation(currentLocation);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  return (
    <UserLocationContext.Provider value={{location, setLocation}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MainScreen"
            component={MainScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MapScreen"
            component={MapScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SearchScreen"
            component={SearchScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="PlaceDetailScreen"
            component={PlaceDetailScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ContactList"
            component={ContactList}
          />
          <Stack.Screen
            name="EmergencyContactScreen"
            options={{headerShown: false}}
            component={EmergencyContactScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Help"
            component={Help}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="History"
            component={History}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="About"
            component={About}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserLocationContext.Provider>
  );
}
