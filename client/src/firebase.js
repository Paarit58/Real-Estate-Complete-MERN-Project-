// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-a4040.firebaseapp.com",
  projectId: "real-estate-a4040",
  storageBucket: "real-estate-a4040.appspot.com",
  messagingSenderId: "666208102925",
  appId: "1:666208102925:web:bc4c4cb2d8b9d2779e8344"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

