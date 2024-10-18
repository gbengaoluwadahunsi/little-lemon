import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({ userProfile, saveProfile, clearProfile }) {
  const [name, setName] = useState(userProfile?.name || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [notifications, setNotifications] = useState({
    orderStatus: userProfile?.notifications?.orderStatus || false,
    passwordChanges: userProfile?.notifications?.passwordChanges || false,
    specialOffers: userProfile?.notifications?.specialOffers || false,
    newsletter: userProfile?.notifications?.newsletter || false,
  });

  const navigation = useNavigation();

  const handleSave = () => {
    saveProfile({ name, email, phoneNumber, notifications });
    navigation.goBack();
  };

  const handleLogout = () => {
    clearProfile();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images.jpeg')} style={styles.profileImage} />
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '2rem', alignItems: 'center', marginVertical: 16 }}>
      <TouchableOpacity style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Text style={styles.sectionTitle}>Email notifications</Text>
      {Object.entries(notifications).map(([key, value]) => (
        <View key={key} style={styles.notificationItem}>
          <Text style={styles.notificationText}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</Text>
          <Switch
            value={value}
            onValueChange={(newValue) => setNotifications({ ...notifications, [key]: newValue })}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text  style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.discardButton} onPress={() => navigation.goBack()}>
          <Text style={styles.discardButtonText}>Discard changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  
  },
  changeButton: {
    backgroundColor: '#495E57',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  
  },
  changeButtonText: {
    color: '#fff',
  },
  removeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#495E57',
  },
  removeButtonText: {
    color: '#495E57',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  discardButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#495E57',
    flex: 1,
    marginRight: 10,
  },
  discardButtonText: {
    color: '#495E57',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#495E57',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});