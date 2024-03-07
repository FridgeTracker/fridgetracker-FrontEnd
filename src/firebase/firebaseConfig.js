// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: apiKey,
  authDomain: "group-be90d.firebaseapp.com",
  databaseURL: "https://group-be90d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "group-be90d",
  storageBucket: "group-be90d.appspot.com",
  messagingSenderId: "205149251811",
  appId: "1:205149251811:web:c707afdce3ace2ba4abdd6",
  measurementId: "G-4ZNZDVHPGX"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);