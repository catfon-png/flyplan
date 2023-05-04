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
exports.getTrips = void 0;
const db_1 = require("../db");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, } = require("firebase/firestore");
const app = initializeApp(db_1.firebaseConfig);
const db = getFirestore(app);
const getTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDocRef = doc(db, "users", userId);
        const userInDb = yield getDoc(userDocRef);
        if (!userInDb.exists()) {
            return { error: "User not found" };
        }
        const userData = userInDb.data();
        return userData.trips;
    }
    catch (error) {
        console.log(error, 'Internal Server Error');
        throw error;
    }
});
exports.getTrips = getTrips;
