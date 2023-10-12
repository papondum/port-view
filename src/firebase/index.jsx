// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd1O5bJyC3g_gHubFmJHmIojE9Z6QUYK0",
  authDomain: "synweb-7f611.firebaseapp.com",
  projectId: "synweb-7f611",
  storageBucket: "synweb-7f611.appspot.com",
  messagingSenderId: "23156901511",
  appId: "1:23156901511:web:e62c57b81939b57f26da22",
};

// Initialize Firebase
let firebase = initializeApp(firebaseConfig);
const db = getFirestore();
export { firebase, db };
