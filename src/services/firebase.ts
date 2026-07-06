import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5zGWn1bolSFjR3CsWyLNitRkE3vnmWbw",
  authDomain: "alchemist-at-work.firebaseapp.com",
  projectId: "alchemist-at-work",
  storageBucket: "alchemist-at-work.firebasestorage.app",
  messagingSenderId: "839258732098",
  appId: "1:839258732098:web:886abb3563bf2e24e75fdb",
  measurementId: "G-XPG1S588H8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
