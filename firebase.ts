import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDH4FCtI_wv8UoKuGlnSJbt_v7gtFE6pEA",
  authDomain: "notion-clone-b9c86.firebaseapp.com",
  projectId: "notion-clone-b9c86",
  storageBucket: "notion-clone-b9c86.firebasestorage.app",
  messagingSenderId: "572473908945",
  appId: "1:572473908945:web:9180c779a18f7ad5286ff0",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
