import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate('MainScreen');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    navigation.navigate('RegistrationScreen');
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log('Logged in with Google:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Image source={require('./images/onboardScreen3.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.googleButton}>
          <Image source={require('./images/google-icon.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}> Or </Text>
          <View style={styles.line}></View>
        </View>
        <TouchableOpacity onPress={handleSignUp} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
  
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    color: 'black',
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DDDDDD',
  },
  googleIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 5,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
    marginRight: 10,
  },
  orText: {
    fontSize: 16,
    color: '#999999',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 16,
    color: '#999999',
  },
  registerButton: {
    marginLeft: 5,
  },
});

