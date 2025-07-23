 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUmoN-7nIaYSRFAq2pN3J_AyWLfU1iuYI",
  authDomain: "costum-e7c55.firebaseapp.com",
  projectId: "costum-e7c55",
  storageBucket: "costum-e7c55.firebasestorage.app",
  messagingSenderId: "323021509339",
  appId: "1:323021509339:web:b20c90983856b002dd32fe",
  measurementId: "G-TTF8D0FVLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);