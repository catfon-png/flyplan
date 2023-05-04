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
exports.deleteItemById = void 0;
const db_1 = require("../db");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, updateDoc, getDoc } = require("firebase/firestore");
const app = initializeApp(db_1.firebaseConfig);
const db = getFirestore(app);
const deleteItemById = (userId, listId, tripUuid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId || !listId || !tripUuid) {
            throw new Error("Invalid user ID, list ID, or trip UUID");
        }
        const userDocRef = doc(db, "users", userId);
        const userInDb = yield getDoc(userDocRef);
        if (!userInDb.exists()) {
            throw new Error("User not found");
        }
        const userData = userInDb.data();
        const trips = userData.trips;
        if (!trips || !Array.isArray(trips)) {
            throw new Error("Invalid trips data format");
        }
        const listIndex = trips.findIndex((list) => list.tripId === listId);
        if (listIndex === -1) {
            throw new Error(`List ${listId} not found`);
        }
        const itineraries = trips[listIndex].itineraries.filter((trip) => trip.uuid !== tripUuid);
        const updatedList = Object.assign(Object.assign({}, trips[listIndex]), { itineraries });
        const updatedTrips = [...trips];
        updatedTrips.splice(listIndex, 1, updatedList);
        yield updateDoc(userDocRef, { trips: updatedTrips });
        return { message: "Trip deleted from database" };
    }
    catch (error) {
        console.log(error, 'error in deleteItemById: backend/modules/firebase/controllers/dbItem.ts');
        throw error;
    }
});
exports.deleteItemById = deleteItemById;
