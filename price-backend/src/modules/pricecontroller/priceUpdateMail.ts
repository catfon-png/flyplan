import axios from "axios"
import { getUsersTrips } from "../firebase/controllers/dbUser"
import { skyscannerApiFor } from "../skyscannerApi/skyscannerforbackend"
import requestQuery from "./requestQuery"
const sgMail = require('@sendgrid/mail')
// const admin = require('firebase-admin');
import * as admin from 'firebase-admin';
const serviceAccount = require('../../../flyplan-firebase-adminsdk-co4bk-861feb40fb.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

interface FlightInfo {
    itinerary: string
    price: string;
    timeStamp: string;
    oldPrice: string;
    oldTimeStamp: string;
    priceDifference: number;
    tripName:string;
    userId:string;
    origin: string;
    destination: string;
    departureDateForMail: {};
}

interface Item {
    itinerary: string;
    price: number;
}


// get all user info and trip data from dbUser
const getUserFlightData = async () => {
    const data = await getUsersTrips()
    // console.log('XXXXXX',data);
    return data
}

// getUserFlightData()

// get user flight information
const getFlightData = async () => {
    try {
        const userFlightData = await getUserFlightData()
        // console.log(userFlightData);
        const flightData: any[] = [];
        const queryList = await userFlightData.map(async (trip) => {
          const query = await requestQuery(trip);
          const response = await skyscannerApiFor(query)   
          /// for each trip itinerary we getting new prices from API
          const updatedPriceInfoFlights = {
            userId: trip.userId,
            tripName:trip.tripName,
            responseApi: response,

          }
          // console.log(updatedPriceInfoFlights);
          // console.log(query.query.queryLegs);
          // console.log(query);
        // console.log(response);
          return updatedPriceInfoFlights
        })
        // console.log(queryList);
        return queryList
    } catch (error: any) {
        console.log(error.message);
        return error;
    }
};
// getFlightData()

const findMatchingFlight = async () => {
  const queryList = await getFlightData();
  const getFilteredFlightInfo = await Promise.all(queryList);
  const userData = await getUserFlightData();
  console.log(userData); // add this
  // console.log(getFilteredFlightInfo); // and this
  const matchingFlightInfo: FlightInfo[] = [];

  userData.map((trip) => {
    getFilteredFlightInfo.map((filteredData) => {
      if(trip.userId === filteredData.userId ){
        filteredData.responseApi.filter((item:any) => {
          if (item.itinerary == trip.itinerary) {
            const matchingFlight: FlightInfo  = {
              itinerary: trip.itinerary,
              price: item.price,
              timeStamp: new Date().toLocaleString(),
              oldPrice:  trip.price,
              oldTimeStamp: trip.timeStamp,
              priceDifference: +item.price - +trip.price,
              tripName: trip.tripName,
              userId: trip.userId,
              origin: trip.origin,
              destination: trip.destination,
              departureDateForMail: trip.departureDate
            };
            // console.log(matchingFlight);
            matchingFlightInfo.push(matchingFlight);
          }
        })
      }
    })
  })
  // console.log("matchingFlightInfo:", matchingFlightInfo); // add this
  return matchingFlightInfo;
};


// findMatchingFlight()

const checkPriceDifference = async ()  => {
  const data = await findMatchingFlight()
  
  // Create an object to store trips grouped by user ID
  const tripsByUser: {[key: string]: any} = {};

  // Group trips by user ID
  data.forEach((trip) => {
    if (!tripsByUser[trip.userId]) {
      tripsByUser[trip.userId] = [];
    }
    tripsByUser[trip.userId].push(trip);
  });
  
  // Send email for each user if the price has changed for any of their trips
  for (const userId in tripsByUser) {
    const userTrips = tripsByUser[userId];
    const hasPriceChanged = userTrips.some((trip:FlightInfo) => trip.price !== trip.oldPrice);

    if (hasPriceChanged) {
      const user = await getEmailForUserId(userId);
      const email = user.email;
      const userName = user.displayName
      // Generate email body with all trips for which the price has changed
      const tripsInfo = userTrips
      .filter((trip: FlightInfo) => trip.price !== trip.oldPrice)
      .map((trip: any) => {
        return `-Hello ${userName} From ${trip.origin} to ${trip.destination} $${trip.oldPrice} -> $${trip.price} and difference is ${trip.priceDifference}`;
      })
      .join('\n');


      // console.log(tripsInfo);
      await sendEmail({ userId, email, tripsInfo });
    }
  }
}

const getEmailForUserId = async (userId: string) => {
  const user = await admin.auth().getUser(userId);
  return user;
}

const sendEmail = async ({ userId, email, tripsInfo }: { userId: string, email: string | undefined, tripsInfo: string }) => {
  sgMail.setApiKey('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');
  const msg = {
    to: email,
    from: 'flyplan.powerkats@gmail.com',
    subject: 'Price Change Alert',
    text: `The price of your flight itinerary has changed for the following trips:\n${tripsInfo}`,
  };
  
  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email} for user ID: ${userId}`);
  } catch (error) {
    console.error(error);
  }
}

// checkPriceDifference()




// const sendEmail = firebase.functions().httpsCallable('sendEmail');
// sendEmail({ userId: 'USER_ID', priceChange: 'NEW_PRICE' });

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// sgMail.setApiKey('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')
// const msg = {
//   to: 'aaltuntasmustafaa@gmail.com', // Change to your recipient
//   from: 'flyplan.powerkats@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })






// Configure Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'flyplan.powerkats@gmail.com', // Replace with your Gmail email address
//       pass: 'powerkats4!', // Replace with your Gmail email password
//     },
//   });
  
//   export const sendEmail = (async () => {
//     // Get the price difference from your price function
//     const priceDifference: any = await findMatchingFlight();
  
//     // Check if the price difference exceeds the threshold
//     if ( priceDifference.priceDifference !== 0 ) {
//       console.log("checking");
  
//       // Define the email
//       const mailOptions = {
//         from: 'flyplan.powerkats@gmail.com', // Replace with your Gmail email address
//         to: 'aaltuntasmustafaa@gmail.com', // Replace with the recipient's email address
//         subject: 'Price Alert',
//         text: `The price difference has reached ${priceDifference.priceDifference}.`,
//       };
  
//       // Send the email using Nodemailer
//       try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully:', response);
//       } catch (error) {
//         console.error('Error sending email:', error);
//       }
//     }
//   })


//   export const sendEmailTest = (async () => {

//       // Define the email
//       const mailOptions = {
//         from: 'flyplan.powerkats@gmail.com', // Replace with your Gmail email address
//         to: 'aaltuntasmustafaa@gmail.com', // Replace with the recipient's email address
//         subject: 'Price Alert',
//         text: `The price difference has reached testing.`,
//       };

//       // Send the email using Nodemailer
//       try {
//         const response = await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully:', response);
//       } catch (error) {
//         console.error('Error sending email:', error);
//       }
//     }
//   )

//   sendEmailTest()

// Define the sendEmail function
// export const sendEmail = (async () => {
//   // Get the price difference from your price function
//   const priceDifference: any = await findMatchingFlight();

//   // Check if the price difference exceeds the threshold
//   if ( priceDifference.priceDifference !== 0 ) {
//     console.log("checking");
//     // Define the message payload
//     const message = {
//       notification: {
//         title: 'Price Alert',
//         body: `The price difference has reached ${priceDifference}.`,
//       },
//       topic: 'priceUpdates',
//     };
//     // Send the message using Firebase Cloud Messaging
//     try {
//       const response = await admin.messaging().send(message);
//       console.log('Message sent successfully:', response);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   }
// });







// findMatchingFlight()
// findMatchingFlight()
// getFlightData()

// 9451-2305181835--32356-0-10694-2305182010