// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_APIKEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  
  authDomain: "sportconnect-276f6.firebaseapp.com",
  projectId: "sportconnect-276f6",
  storageBucket: "sportconnect-276f6.appspot.com",
  messagingSenderId: "773974012043",
  appId: "1:773974012043:web:cef2b3f58ff471474d248e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);