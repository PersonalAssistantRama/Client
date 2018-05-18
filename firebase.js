import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC60gliOEgrL7cDU6NorqOac0mnV8-Pm9g",
    authDomain: "yupi-fdbf4.firebaseapp.com",
    databaseURL: "https://yupi-fdbf4.firebaseio.com",
    projectId: "yupi-fdbf4",
    storageBucket: "yupi-fdbf4.appspot.com",
    messagingSenderId: "247468678295"
  };
  firebase.initializeApp(config);
  
export const db = firebase.database()