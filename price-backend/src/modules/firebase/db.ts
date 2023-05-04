const {
  getFirestore,
  doc,
  setDoc,
  initializeFirestore,
  firebaseApp
} = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
require("dotenv").config();

export const firebaseConfig = {
  apiKey: 'AIzaSyBgd-D9GZ3rshW60taUT6WkzhCW32t2BhE',
  authDomain: `flyplan.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: `https://flyplan-default-rtdb.europe-west1.firebasedatabase.app`,
  projectId: 'flyplan',
  storageBucket: `flyplan.appspot.com`,
  messagingSenderId: '2089819176',
  appId: 'flyplan',
};