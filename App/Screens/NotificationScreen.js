import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'You have a new notification', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', color: '#B68D40', read: false },
    { id: 2, title: 'Another notification', message: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', color: '#4A90E2', read: false },
    { id: 3, title: 'Third notification', message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', color: '#FACB45', read: false },
  ]);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationPress = (id) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <>
          {notifications.map(notification => (
            <TouchableOpacity 
              key={notification.id} 
              onPress={() => handleNotificationPress(notification.id)} 
              style={[styles.notification, { backgroundColor: notification.read ? '#E0E0E0' : '#FFF' }]}
            >
              <Icon name="notifications" size={48} color={notification.color} />
              <Text style={[styles.title, { color: notification.color }]}>{notification.title}</Text>
              <Text style={styles.message}>{notification.message}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleClearNotifications} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Notifications</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noNotifications}>No notifications to display</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF1744',
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noNotifications: {
    fontSize: 20,
    color: '#9E9E9E',
  },
});

export default NotificationScreen;
