import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {auth,db} from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc,collection,doc, setDoc } from "firebase/firestore";

import img from '../images/chs.png';

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');

   const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate('MainScreen');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    console.log('Button click');
    // await setDoc(doc(db, 'users', 'LA'), {
    //     firstName: "heloo",
    //     lastName: "hii",
    //   });
      
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        await setDoc(doc(db, 'users', user.uid), {
          firstName: fName,
          lastName: lName,
        });
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  return (
 
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
        <Image
          source={require('./images/onboardScreen3.png')}
          style={styles.logo}
        />
          <Text
            style={{
              fontSize: 35,
              color: 'black',
              fontWeight: '700',
            }}>
            Sign Up
          </Text>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#000"
            color="black"
            value={fName}
            onChangeText={text => setfName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Second Name"
            placeholderTextColor="#000"
            color="black"
            value={lName}
            onChangeText={text => setlName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            color="black"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            color="black"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>

          <TouchableOpacity 
            onPress={handleSignUp}   // {handleLogin} Register
            style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Have an account? Login</Text>
        </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    height: 60,
    backgroundColor: '#DC3545',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 330,
    height: 300,
    marginRight: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  forgotPasswordButton: {
  
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#DC3545',
    fontWeight: '700',
    fontSize: 16,
  },
});
