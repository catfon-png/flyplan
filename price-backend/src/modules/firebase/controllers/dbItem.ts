import { firebaseConfig } from "../db";
import { v4 as uuidv4 } from "uuid";


const { initializeApp } = require("firebase/app");

const {
    getFirestore,
    doc,
    updateDoc,
    getDoc,
    setDoc,
    arrayUnion
} = require("firebase/firestore");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





export const addItemToTrip = async (
    userId: string,
    itinerary: any,
    uuidTrip: string | null,
    tripName?: string
) => {

    try {
        if (!userId) {
            throw new Error("Invalid user ID");
        }

        const userDocRef = doc(db, "users", userId);
        const userInDb = await getDoc(userDocRef);

        const completeItinerary = {
            ...JSON.parse(JSON.stringify(itinerary)),
            uuid: uuidv4(),
        };

        if (!userInDb.exists()) {
            const newList = {
                tripId: uuidTrip || uuidv4(),
                tripName: tripName || "Favorites",
                itineraries: [completeItinerary],
            };
            await setDoc(userDocRef, {
                trips: [newList],
            });
        } else {
            const userData = userInDb.data();

            if (!userData.trips) {
                userData.trips = [];
            } else if (!Array.isArray(userData.trips)) {
                userData.trips = Object.values(userData.trips);
            }

            const existingList = uuidTrip
                ? userData.trips.find((list:any) => list.tripId === uuidTrip)
                : userData.trips.find((list:any) => list.tripName === tripName);

            if (existingList) {
                const updatedItineraries = [
                    ...existingList.itineraries,
                    completeItinerary,
                ];
                const updatedLists = userData.trips.map((list:any) => {
                    if (list.tripId === existingList.tripId) {
                        return { ...list, itineraries: updatedItineraries };
                    } else {
                        return list;
                    }
                });
                await updateDoc(userDocRef, { trips: updatedLists });
            } else {
                const newList = {
                    tripId: uuidv4(),
                    tripName: tripName || "Favorites",
                    itineraries: [completeItinerary],
                };
                await updateDoc(userDocRef, { trips: arrayUnion(newList) });
            }
        }

        return { message: "Itinerary added to database" };
    } catch (error) {
        console.log(error, 'error in AddTripToUser: backend/modules/firebase/controllers/dbTrip.ts');
        throw error;
    }
};


export const deleteItemById = async (userId: any, listId:any , tripUuid: any) => {
    try {
        if (!userId || !listId || !tripUuid) {
            throw new Error("Invalid user ID, list ID, or trip UUID");
        }

        const userDocRef = doc(db, "users", userId);
        const userInDb = await getDoc(userDocRef);

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

        const itineraries = trips[listIndex].itineraries.filter(
            (trip:any) => trip.uuid !== tripUuid
        );

        const updatedList = { ...trips[listIndex], itineraries };
        const updatedTrips = [...trips];
        updatedTrips.splice(listIndex, 1, updatedList);

        await updateDoc(userDocRef, { trips: updatedTrips });

        return { message: "Trip deleted from database" };
    } catch (error) {
        console.log(error, 'error in deleteItemById: backend/modules/firebase/controllers/dbItem.ts');
        throw error;
    }
};
