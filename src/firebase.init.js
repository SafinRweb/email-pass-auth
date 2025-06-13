// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjKUBRpz_VUBwfRzK7XJ4EmXYGctwW9f0",
  authDomain: "email-pass-auth-cfa5b.firebaseapp.com",
  projectId: "email-pass-auth-cfa5b",
  storageBucket: "email-pass-auth-cfa5b.firebasestorage.app",
  messagingSenderId: "755821698944",
  appId: "1:755821698944:web:2f93899c565116dc806b65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;