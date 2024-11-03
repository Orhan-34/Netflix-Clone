// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPQlLd0_6gO7d6Z3yCve61e7sEl0fdlQ8",
  authDomain: "netflix-clone-yt-fdbf2.firebaseapp.com",
  projectId: "netflix-clone-yt-fdbf2",
  storageBucket: "netflix-clone-yt-fdbf2.appspot.com",
  messagingSenderId: "476571874481",
  appId: "1:476571874481:web:3166d18ed896d511d8de90",
  measurementId: "G-8BSD1LS0HF"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }