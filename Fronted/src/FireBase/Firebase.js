// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional   
  const firebaseConfig = {
  apiKey: "AIzaSyCR_JCKVchwm_TDldPtMug-H-ZE3U0lbww",
  authDomain: "study-planer-1c5d5.firebaseapp.com",
  projectId: "study-planer-1c5d5",
  storageBucket: "study-planer-1c5d5.firebasestorage.app",
  messagingSenderId: "1014151932543",
  appId: "1:1014151932543:web:759c136e582aab3a396d4a",
  measurementId: "G-0N0CR8623Z"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
