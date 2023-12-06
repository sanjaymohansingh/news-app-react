import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "newsapp-e3ae1.firebaseapp.com",
  projectId: "newsapp-e3ae1",
  storageBucket: "newsapp-e3ae1.appspot.com",
  messagingSenderId: "776853644134",
  appId: "1:776853644134:web:e149b344a765bd5df1dea7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();
export default db;
export { app, auth };
