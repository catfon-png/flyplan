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
exports.deleteTrip = exports.createNewList = exports.addTripToUser = void 0;
const db_1 = require("../db");
const uuid_1 = require("uuid");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion,
// arrayRemove,
 } = require("firebase/firestore");
const app = initializeApp(db_1.firebaseConfig);
const db = getFirestore(app);
const addTripToUser = (userId, itinerary, uuidTrip, tripName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            throw new Error("Invalid user ID");
        }
        const userDocRef = doc(db, "users", userId);
        const userInDb = yield getDoc(userDocRef);
        const sanitizedItinerary = Object.assign(Object.assign({}, JSON.parse(JSON.stringify(itinerary))), { uuid: (0, uuid_1.v4)() });
        if (!userInDb.exists()) {
            const newList = {
                tripId: uuidTrip || (0, uuid_1.v4)(),
                tripName: tripName || "Favorites",
                itineraries: [sanitizedItinerary],
            };
            yield setDoc(userDocRef, {
                trips: [newList],
            });
        }
        else {
            const userData = userInDb.data();
            if (!userData.trips) {
                userData.trips = [];
            }
            else if (!Array.isArray(userData.trips)) {
                userData.trips = Object.values(userData.trips);
            }
            const existingList = uuidTrip
                ? userData.trips.find((list) => list.tripId === uuidTrip)
                : userData.trips.find((list) => list.tripName === tripName);
            if (existingList) {
                const updatedItineraries = [
                    ...existingList.itineraries,
                    sanitizedItinerary,
                ];
                const updatedLists = userData.trips.map((list) => {
                    if (list.tripId === existingList.tripId) {
                        return Object.assign(Object.assign({}, list), { itineraries: updatedItineraries });
                    }
                    else {
                        return list;
                    }
                });
                yield updateDoc(userDocRef, { trips: updatedLists });
            }
            else {
                const newList = {
                    tripId: (0, uuid_1.v4)(),
                    tripName: tripName || "Favorites",
                    itineraries: [sanitizedItinerary],
                };
                yield updateDoc(userDocRef, { trips: arrayUnion(newList) });
            }
        }
        return { message: "Itinerary added to database" };
    }
    catch (error) {
        console.log(error, 'error in AddTripToUser: backend/modules/firebase/controllers/dbTrip.ts');
        throw error;
    }
});
exports.addTripToUser = addTripToUser;
const createNewList = (userId, listName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            throw new Error("Invalid user ID");
        }
        const userDocRef = doc(db, "users", userId);
        const userInDb = yield getDoc(userDocRef);
        if (!userInDb.exists()) {
            const newList = {
                tripId: (0, uuid_1.v4)(),
                tripName: listName,
                itineraries: [],
            };
            yield setDoc(userDocRef, {
                trips: [newList],
            });
        }
        else {
            const userData = userInDb.data();
            if (!userData.trips) {
                userData.trips = [];
            }
            else if (!Array.isArray(userData.trips)) {
                userData.trips = Object.values(userData.trips);
            }
            const existingList = userData.trips.find((list) => list.tripName === listName);
            if (!existingList) {
                const newList = {
                    tripId: (0, uuid_1.v4)(),
                    tripName: listName,
                    itineraries: [],
                };
                yield updateDoc(userDocRef, { trips: arrayUnion(newList) });
            }
            else {
                throw new Error("List with that name already exists");
            }
        }
        return { message: "List added to database" };
    }
    catch (error) {
        console.log(error, 'error in CreateNewList: backend/modules/firebase/controllers/dbTrip.ts');
        throw error;
    }
});
exports.createNewList = createNewList;
const deleteTrip = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId || !tripId) {
            throw new Error("Invalid user ID or trip ID");
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
        const updatedTripList = trips.filter((trip) => trip.tripId !== tripId);
        yield updateDoc(userDocRef, { trips: updatedTripList });
        return { message: "Trip deleted from database" };
    }
    catch (error) {
        console.log(error, 'error in deleteTripById: backend/modules/firebase/controllers/dbTrip.ts');
        throw error;
    }
});
exports.deleteTrip = deleteTrip;
