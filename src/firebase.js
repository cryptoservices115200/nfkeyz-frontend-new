import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIv-0w_LPFWQTP9phkEGzimFnyv07tTFE",
  authDomain: "crogram-7e7d3.firebaseapp.com",
  projectId: "crogram-7e7d3",
  storageBucket: "crogram-7e7d3.appspot.com",
  messagingSenderId: "580725388282",
  appId: "1:580725388282:web:40d87deec82b05b302ea43",
  measurementId: "G-EN5FZH274V"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
export default firebase;
