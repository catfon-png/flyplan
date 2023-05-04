"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const { getFirestore, doc, getDoc, updateDoc, setDoc, } = require("firebase/firestore");
const { initializeApp } = require("firebase/app");
require("dotenv").config();
exports.firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: `https://${process.env.DATABASE_NAME}-default-rtdb.europe-west1.firebasedatabase.app`,
    projectId: process.env.PROJECT_ID,
    storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID,
};
// Initialize Firebase
const app = initializeApp(exports.firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, "flyplan", "data");
// Read data from the document
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const docSnapshot = yield getDoc(docRef);
        if (docSnapshot.exists()) {
            console.log("Document data:", docSnapshot.data());
        }
        else {
            console.log("No such document!");
        }
    });
}
// Update an existing document with new data
function updateData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield updateDoc(docRef, { someField: "new value" });
        console.log("Document updated.");
    });
}
// Create a new document or overwrite an existing one with new data
function setData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield setDoc(docRef, { someField: "new value" });
        console.log("Document set/updated.");
    });
}
getData();
updateData();
setData();
