import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";

export default function CategoryList({ setSelectedCategory }) {
  const categoryList = [
    {
      id: 1,
      name: "Gas Station",
      value: "gas_station",
      icon: require("./../../../assets/gas.png"),
    },
    {
      id: 2,
      name: "Garage",
      value: "car_repair",
      icon: require("./../../../assets/car-repair.png"),
    },
    {
      id: 3,
      name: "Hospital",
      value: "hospital",
      icon: require("./../../../assets/hospital.png"),
    },
    {
      id: 4,
      name: "Police",
      value: "police",
      icon: require("./../../../assets/police-station.png"),
    },
  ];
  return (
    <View style={{ marginTop: 15 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "raleway-bold",
        }}
      >
        Select Top Category
      </Text>

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item.value)}>
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
