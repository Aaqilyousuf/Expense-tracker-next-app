// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYDDSW7btX3S_Je6L55h_NWg_wQ2dLtgg",
  authDomain: "expense-tracker-next-app.firebaseapp.com",
  projectId: "expense-tracker-next-app",
  storageBucket: "expense-tracker-next-app.appspot.com",
  messagingSenderId: "176992557787",
  appId: "1:176992557787:web:71598e03f42361e7fb0afe",
  measurementId: "G-3M773ZKD6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
