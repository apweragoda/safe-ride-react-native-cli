import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAKiDDG3AWrDynp7poWJj_rteA85vQl4Ik",
  authDomain: "safe-ride-90fca.firebaseapp.com",
  projectId: "safe-ride-90fca",
  storageBucket: "safe-ride-90fca.appspot.com",
  messagingSenderId: "16571767948",
  appId: "1:16571767948:web:c8a2971769b3cd9670afa9",
  measurementId: "G-NT7JGGZ7VF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { auth,db};