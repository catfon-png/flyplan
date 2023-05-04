import { firebaseConfig } from "../db";
import { v4 as uuidv4 } from "uuid";

const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = require("firebase/firestore");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const createNewList = async (userId: string, listName: string) => {
  try {
    if (!userId) {
      throw new Error("Invalid user ID");
    }

    const userDocRef = doc(db, "users", userId);
    const userInDb = await getDoc(userDocRef);

    if (!userInDb.exists()) {
      const newList = {
        tripId: uuidv4(),
        tripName: listName,
        itineraries: [],
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

      const existingList = userData.trips.find(
        (list:any) => list.tripName === listName
      );

      if (!existingList) {
        const newList = {
          tripId: uuidv4(),
          tripName: listName,
          itineraries: [],
        };

        await updateDoc(userDocRef, { trips: arrayUnion(newList) });
      } else {
        throw new Error("List with that name already exists");
      }
    }

    return { message: "List added to database" };
  } catch (error) {
    console.log(error, 'error in CreateNewList: backend/modules/firebase/controllers/dbTrip.ts');
    throw error;
  }
};

export const deleteTrip = async (userId:any, tripId:any) => {
    try {
        if (!userId || !tripId ) {
            throw new Error("Invalid user ID or trip ID");
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

    const updatedTripList = trips.filter((trip) => trip.tripId !== tripId);
    await updateDoc(userDocRef, { trips: updatedTripList });

    return { message: "Trip deleted from database" };
  } catch (error) {
    console.log(error, 'error in deleteTripById: backend/modules/firebase/controllers/dbTrip.ts');
    throw error;
  }
};
