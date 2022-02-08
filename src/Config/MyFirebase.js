import firebase from "firebase";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(config);

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
