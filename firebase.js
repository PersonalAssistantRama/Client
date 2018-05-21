import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBuzlxnyaF0GVp2BKY67dCvN1JybqppFvk",
  authDomain: "yupi-alarm-feature.firebaseapp.com",
  databaseURL: "https://yupi-alarm-feature.firebaseio.com",
  projectId: "yupi-alarm-feature",
  storageBucket: "yupi-alarm-feature.appspot.com",
  messagingSenderId: "102567823802"
};
firebase.initializeApp(config);

export const db = firebase.database()