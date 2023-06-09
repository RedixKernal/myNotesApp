// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH9UP-8rQZ5INaHeNkcr3wUwEIhx9ZCGg",
  authDomain: "img-6c440.firebaseapp.com",
  projectId: "img-6c440",
  storageBucket: "img-6c440.appspot.com",
  messagingSenderId: "833529323934",
  appId: "1:833529323934:web:98010f167b9e237244f68f",
  measurementId: "G-5E95LTRTMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const store = getFirestore(app);