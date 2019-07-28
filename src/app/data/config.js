import firebase from 'firebase';

//token que da firebase para loggearse

// Your web app's Firebase configuration
  const  firebaseConfig = {
    apiKey: "AIzaSyDYqDrrf1g_v1x8UO_4-DRr8_0Q1XOF4gY",
    authDomain: "myproyectauth.firebaseapp.com",
    databaseURL: "https://myproyectauth.firebaseio.com",
    projectId: "myproyectauth",
    storageBucket: "",
    messagingSenderId: "490780351039",
    appId: "1:490780351039:web:3944c4fa9b6b67d7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//firebaseauth
export const  ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
