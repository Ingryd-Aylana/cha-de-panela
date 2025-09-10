
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbflGlF0JtLHmynHv-KV8F3QxUoXMm4SM",
  authDomain: "convite-carol-lucas.firebaseapp.com",
  projectId: "convite-carol-lucas",
  storageBucket: "convite-carol-lucas.firebasestorage.app",
  messagingSenderId: "1068799734548",
  appId: "1:1068799734548:web:310c798a9eb3b562374801"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
