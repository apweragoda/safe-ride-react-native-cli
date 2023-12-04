

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXis5TwrqQ9lUWZIC9fSFO2rzLjdvz3mc",
  authDomain: "myapp-ef2be.firebaseapp.com",
  projectId: "myapp-ef2be",
  storageBucket: "myapp-ef2be.appspot.com",
  messagingSenderId: "453264653918",
  appId: "1:453264653918:web:f212c45d63e22ffb6dbecf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };

