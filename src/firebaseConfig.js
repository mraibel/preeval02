// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqbDkfTN8IOOGfgC0QaLE92mYew2nVyzk",
  authDomain: "reactfb-82322.firebaseapp.com",
  projectId: "reactfb-82322",
  storageBucket: "reactfb-82322.firebasestorage.app",
  messagingSenderId: "69696041979",
  appId: "1:69696041979:web:63c47978332214e15c915e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);