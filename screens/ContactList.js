import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactList = ({navigation}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getSavedContacts = async () => {
      try {
        const savedContactsJson = await AsyncStorage.getItem(
          'selectedContacts',
        );
        if (savedContactsJson !== null) {
          const savedContacts = JSON.parse(savedContactsJson);
          console.log(
            'Selected contacts retrieved from local storage:',
            savedContacts,
          );
          setContacts(savedContacts);
        } else {
          console.log('No selected contacts found in local storage');
        }
      } catch (error) {
        console.log(
          'Error retrieving selected contacts from local storage:',
          error,
        );
      }
    };

    getSavedContacts();
  }, []);

  const deleteContact = item => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${item.displayName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts(contacts.filter(c => c.recordID !== item.recordID));
            AsyncStorage.setItem(
              'selectedContacts',
              JSON.stringify(
                contacts.filter(c => c.recordID !== item.recordID),
              ),
            );
          },
        },
      ],
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.txt}>{item.displayName}</Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
        <Text style={styles.txt}>{item.phoneNumbers}</Text>
      )}
      <TouchableOpacity
        title=""
        onPress={() => {
          deleteContact(item);
        }}>
        <Icon name="delete" size={24} color="#DC3545" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.recordID}
        style={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('EmergencyContactScreen');
        }}>
        <Icon name="add" size={48} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#DC3545',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  listContainer: {
    marginBottom: 100,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  txt: {
    color: '#000',
  },
});

export default ContactList;
