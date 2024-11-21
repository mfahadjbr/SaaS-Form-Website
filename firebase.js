// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, where } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCegqURvlPldRyC-8_7MCcNJuWDUse01P0",
  authDomain: "new-software1.firebaseapp.com",
  projectId: "new-software1",
  storageBucket: "new-software1.firebasestorage.app",
  messagingSenderId: "828609908165",
  appId: "1:828609908165:web:0f321cc7581b795a258fac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, doc, getDoc, setDoc, onSnapshot, collection, getDocs, query, where };
