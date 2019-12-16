import firebase from 'firebase'
//import * as firebase from 'firebase/app'
import firestore from 'firebase/firestore'


// Kode firebase auth dari firebase

var firebaseConfig = {
    apiKey: "AIzaSyCDBk7broCXK-8iOq8QYJc0gAErMJISjYg",
    authDomain: "urlmyid.firebaseapp.com",
    databaseURL: "https://urlmyid.firebaseio.com",
    projectId: "urlmyid",
    storageBucket: "urlmyid.appspot.com",
    messagingSenderId: "1092449157882",
    appId: "1:1092449157882:web:6679b396004c3aed5c7f43"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()