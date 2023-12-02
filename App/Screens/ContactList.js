import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Contacts from "expo-contacts";

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
          // console.log(data);
        } else {
          console.log("No contacts!");
        }
      }
    })();
  }, []);
  useEffect(() => {
    const getSavedContacts = async () => {
      try {
        const savedContactsJson = await AsyncStorage.getItem(
          "selectedContacts"
        );
        if (savedContactsJson !== null) {
          const savedContacts = JSON.parse(savedContactsJson);
          console.log(
            "Selected contacts retrieved from local storage:",
            savedContacts
          );
          setContacts(savedContacts);
        } else {
          console.log("No selected contacts found in local storage");
        }
      } catch (error) {
        console.log(
          "Error retrieving selected contacts from local storage:",
          error
        );
      }
    };
    getSavedContacts();
  }, []);

  const deleteContact = (item) => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete ${item.displayName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setContacts(contacts.filter((c) => c.recordID !== item.recordID));
            AsyncStorage.setItem(
              "selectedContacts",
              JSON.stringify(
                contacts.filter((c) => c.recordID !== item.recordID)
              )
            );
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ScrollView>
      <View style={styles.itemContainer}>
        <Text style={styles.txt}>{item.firstName}</Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <View>
            {item.phoneNumbers.map((phoneNumber, index) => (
              <Text key={index} style={styles.txt}>
                {phoneNumber.number}
              </Text>
            ))}
          </View>
        )}
        <TouchableOpacity
          title=""
          onPress={() => {
            deleteContact(item);
          }}
        >
          <Icon name="delete" size={24} color="#DC3545" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("EmergencyContactScreen");
        }}
      >
        <Icon name="add" size={48} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FDFDFD",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#DC3545",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  listContainer: {
    marginBottom: 100,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  txt: {
    color: "#000",
  },
});

export default ContactList;
