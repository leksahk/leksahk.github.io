import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCT9EoarPwgpZqczFAuy55afioIk5VxOUk",
  authDomain: "lab4-hackathons.firebaseapp.com",
  projectId: "lab4-hackathons",
  storageBucket: "lab4-hackathons.firebasestorage.app",
  messagingSenderId: "1041309465953",
  appId: "1:1041309465953:web:1f3c44dcb04f3a7091d920",
  measurementId: "G-HDW35TZPSY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 