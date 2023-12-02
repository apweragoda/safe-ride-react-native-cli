import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKiDDG3AWrDynp7poWJj_rteA85vQl4Ik",
  authDomain: "safe-ride-90fca.firebaseapp.com",
  projectId: "safe-ride-90fca",
  storageBucket: "safe-ride-90fca.appspot.com",
  messagingSenderId: "16571767948",
  appId: "1:16571767948:web:c8a2971769b3cd9670afa9",
  measurementId: "G-NT7JGGZ7VF",
};
// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
