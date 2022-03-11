import firebase from 'firebase/app';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyANgUIiN-91TvIOZvleEPO1W6vESMTfvtk",
  authDomain: "fbase-ninja-1.firebaseapp.com",
  projectId: "fbase-ninja-1",
  storageBucket: "fbase-ninja-1.appspot.com",
  messagingSenderId: "435588331949",
  appId: "1:435588331949:web:b713e30113f797b78e0924"
};

// init fbase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };