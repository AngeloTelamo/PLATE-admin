// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEtEU-yIao1dfTcgOGzx0eLjsl_2rkeBc",
  authDomain: "plate-bd7a8.firebaseapp.com",
  projectId: "plate-bd7a8",
  storageBucket: "plate-bd7a8.appspot.com",
  messagingSenderId: "914628104206",
  appId: "1:914628104206:web:8ae0d8552f4d035023ec5f",
  measurementId: "G-EJ1GS1Y61C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
