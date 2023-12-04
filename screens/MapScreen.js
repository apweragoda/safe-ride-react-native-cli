/* eslint-disable prettier/prettier */
import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {UserLocationContext} from '../Context/UserLocationContext';
import GoogleMapView from '../Components/Home/GoogleMapView';
import GlobalApi from '../Services/GlobalApi';
import CategoryList from '../Components/Home/CategoryList';
import PlaceList from '../Components/Home/PlaceList';
import GetLocation from 'react-native-get-location';

export default function MapScreen() {
  const [mapRegion, setmapRegion] = useState([]);
  const [placeList, setPlaceList] = useState([]);

  const {location, setLocation} = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      GetNearBySearchPlace('car_repair');
    }
  }, []);

  const GetNearBySearchPlace = value => {
    GlobalApi.nearByPlace(location.latitude, location.longitude, value).then(
      resp => {
        setPlaceList(resp.data.results);
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ScrollView
        style={{
          padding: 20,
          flex: 1,
        }}>
        {/* <Header /> */}
        <GoogleMapView placeList={placeList} />
        <CategoryList
          setSelectedCategory={value => GetNearBySearchPlace(value)}
        />
        {placeList ? <PlaceList placeList={placeList} /> : null}
      </ScrollView>
    </View>
  );
}
