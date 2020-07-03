import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC1shuTRVSO8C4fFCKYbT_wYJk0wtH1lAA",
  authDomain: "chatzy-2c0a7.firebaseapp.com",
  databaseURL: "https://chatzy-2c0a7.firebaseio.com",
  projectId: "chatzy-2c0a7",
  storageBucket: "chatzy-2c0a7.appspot.com",
  messagingSenderId: "579453515181",
  appId: "1:579453515181:web:44e4da825d3a8fe5571d24",
};

firebase.initializeApp(config);

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
