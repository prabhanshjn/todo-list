// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGsvO0xhVeTftbnoApw0qFqvlo__AGhJE",
    authDomain: "todo-list-8eebb.firebaseapp.com",
    projectId: "todo-list-8eebb",
    storageBucket: "todo-list-8eebb.appspot.com",
    messagingSenderId: "323757872546",
    appId: "1:323757872546:web:9c406b66d5f83714bd4efb",
    measurementId: "G-R4TQYGL48P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();