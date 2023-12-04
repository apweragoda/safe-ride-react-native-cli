import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
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
import {auth, db} from '../firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';

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
          Login
        </Text>
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
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <Text style={styles.orText}> Or </Text>
        <View style={styles.line}></View>
        <TouchableOpacity
          //onPress={handleGoogleSignIn}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>
            Don't have an account? Register
          </Text>
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
  logo: {
    width: 330,
    height: 300,
    marginRight: 10,
    resizeMode: 'contain',
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#DC3545',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#DC3545',
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
