// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCuQTkO9dIAwXPJYWUpg-2MMlKpFlnpiNY",
    authDomain: "cloudfunctiondemo-fd4cc.firebaseapp.com",
    projectId: "cloudfunctiondemo-fd4cc",
    storageBucket: "cloudfunctiondemo-fd4cc.appspot.com",
    messagingSenderId: "46438059374",
    appId: "1:46438059374:web:d0e8ab9dd593c3dee1057f",
    measurementId: "G-T0MC640YZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseAnalytics = getAnalytics(app);
const FirebaseAuth = getAuth(app)
const FirestoreDb = getFirestore(app)

const FirebaseApp = app;

export {
    FirebaseAuth,
    FirebaseAnalytics,
    FirebaseApp,
    FirestoreDb,
}