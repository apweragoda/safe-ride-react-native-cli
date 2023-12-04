import {View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import BusinessItem from './BusinessItem';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

export default function BusinessList({placeList}) {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        renderItem={({item, index}) =>
          index <= 6 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PlaceDetailScreen', {
                  place: item,
                })
              }>
              <BusinessItem place={item} />
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}
