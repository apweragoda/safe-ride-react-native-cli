import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const History = () => {
  const [history, setHistory] = useState([
    {
      date: "Apr 22, 2023",
      time: "10:30 AM",
      distance: "25 km",
      accident: false,
    },
    {
      date: "Apr 21, 2023",
      time: "3:45 PM",
      distance: "12 km",
      accident: true,
    },
    {
      date: "Apr 20, 2023",
      time: "8:15 AM",
      distance: "10 km",
      accident: false,
    },
  ]);

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <View style={styles.historyDetails}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
              <Text
                style={[
                  styles.accident,
                  { color: item.accident ? "red" : "green" },
                ]}
              >
                {item.accident ? "Accident" : "No Accident"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
        <Icon name="delete" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  scrollContainer: {
    padding: 20,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingVertical: 10,
  },
  historyDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  time: {
    fontSize: 16,
    marginRight: 10,
  },
  distance: {
    fontSize: 16,
    marginRight: 10,
  },
  accident: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#DC3545",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default History;
