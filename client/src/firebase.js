// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-auth-system-9f939.firebaseapp.com",
  projectId: "mern-auth-system-9f939",
  storageBucket: "mern-auth-system-9f939.firebasestorage.app",
  messagingSenderId: "1065261423872",
  appId: "1:1065261423872:web:a12ee2e25ffeb2cf1527e5",
  measurementId: "G-5DJVMG2R93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);