// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVwgOc9KqRToCDJe7w2B3VBissKk2R7uU",
  authDomain: "ctmis-e3a2a.firebaseapp.com",
  projectId: "ctmis-e3a2a",
  storageBucket: "ctmis-e3a2a.firebasestorage.app",
  messagingSenderId: "357991543504",
  appId: "1:357991543504:web:2d5deeb0ed57cfddac24d5",
  measurementId: "G-0H590DX0MT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
