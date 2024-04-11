import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  
  authDomain: "sportconnect-276f6.firebaseapp.com",
  projectId: "sportconnect-276f6",
  storageBucket: "sportconnect-276f6.appspot.com",
  messagingSenderId: "773974012043",
  appId: "1:773974012043:web:cef2b3f58ff471474d248e"
};


export const app = initializeApp(firebaseConfig);