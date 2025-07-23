 // firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUmoN-7nIaYSRFAq2pN3J_AyWLfU1iuYI",
  authDomain: "costum-e7c55.firebaseapp.com",
  projectId: "costum-e7c55",
  storageBucket: "costum-e7c55.appspot.com",
  messagingSenderId: "323021509339",
  appId: "1:323021509339:web:b20c90983856b002dd32fe",
  measurementId: "G-TTF8D0FVLS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
