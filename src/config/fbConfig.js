import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBWBzQYcdsOvr_Nrlfx8Tu-llCgMpz4Wzg",
    authDomain: "member-user-use-case.firebaseapp.com",
    databaseURL: "https://member-user-use-case.firebaseio.com",
    projectId: "member-user-use-case",
    storageBucket: "member-user-use-case.appspot.com",
    messagingSenderId: "399411260491",
    appId: "1:399411260491:web:1cd533f15ae95c98acf1ce",
    measurementId: "G-EN4K5QQD34"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  firebase.auth();

  export default firebase;