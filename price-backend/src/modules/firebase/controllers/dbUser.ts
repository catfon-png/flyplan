import { firebaseConfig } from "../db";
const admin = require('firebase-admin');
import type { DocumentData } from "firebase/firestore";
const { initializeApp } = require("firebase/app");

interface Itinerary {
    origin: {
        cityName: string;
    };
    destination: {
        cityName: string;
    };
    itineraryIdOneWay: string;
    itineraryIdRoundTrip: string;
    oneWayDate: string;
    roundTripDate: string;
    priceHistory: {
        price: number;
        timeStamp: number;
    }[];
}

interface Trip {
    tripName: string;
    itineraries?: Itinerary[];
}

interface User {
    id: string;
    trips: Trip[];
}

interface TripInformation {
    userId: string;
    origin: string;
    destination: string;
    itinerary: string;
    departureDate: {
        year: number;
        month: number;
        day: number;
    };
    tripName: string;
    price: string;
    timeStamp: string;
    oneWay: boolean;
}


const {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
} = require("firebase/firestore");


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const getUsersTrips = async (): Promise<TripInformation[]> => {
    try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = querySnapshot.docs.map((doc:DocumentData) => ({ id: doc.id, ...doc.data() }));
        
        const tripCheckPriceInformation: TripInformation[] = users.flatMap((user:User) =>
        user.trips?.filter((trip:Trip) => trip.itineraries?.length)?.map((trip:any) => {
            const itinerary = trip.itineraries[0];
            const timestamp = itinerary.oneWayDate;
            const [day, month, year] = timestamp.split('-');
            return {
                userId: user.id,
                origin: itinerary.origin.cityName,
                destination: itinerary.destination.cityName,
                itinerary: itinerary.itineraryIdOneWay,
                departureDate: {
                    year: Number(year),
                    month: Number(month),
                    day: Number(day)
                },
                departureDateForMail: itinerary.oneWayDate,
                tripName: trip.tripName,
                price: itinerary.priceHistory[0].price,
                timeStamp: itinerary.priceHistory[0].timeStamp,
                oneWay: true
            };
        })
        ).filter(Boolean);
        
        // console.log(tripCheckPriceInformation);
        
        return tripCheckPriceInformation;
    } catch (error) {
        console.log(error, "Internal Server Error");
        throw error;
    }
};


export const getTrips = async (userId: string) => {
    try {
        const userDocRef = doc(db, "users", userId);

        const userInDb = await getDoc(userDocRef);
        if (!userInDb.exists()) {
            return { error: "User not found" };
        }

        const userData = userInDb.data();
        return userData.trips;
    } catch (error) {
        console.log(error, 'Internal Server Error');
        throw error;
    }
};




// const getUsers = async () => {
//     const usersRef = collection(db, "users");
//     const querySnapshot = await getDocs(usersRef);

//     const users = querySnapshot.docs.map((doc: any) => doc.data());

//     return users;
//   };



getUsersTrips()