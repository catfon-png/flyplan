// // require('dotenv').config();
// import axios from 'axios';
// // import { carriers } from 'rapidapi-skyscanner';



// export const SkyscannerApi = async (input) => {
//   const optionsPost = {
//     method: "POST",
//     url: process.env.SKAPI_ASYNC,
//     headers: {
//       "content-type": "application/json",
//       "X-RapidAPI-Key": process.env.X_RapidAPI_Key_Mustafa,
//       // "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
//       "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
//     },
//     data: input,
//   };

//   return await axios
//     .request(optionsPost)
//     .then(function (response) {
//       const data = response.data.content.results;
//       const filteredData = {
//         itineraries: data.itineraries,
//         legs: data.legs,
//         carriers: data.carriers,
//       };
//       const searchList = [];

//       for (const key in filteredData.itineraries) {
//         const itinerary = filteredData.itineraries[key];
//         const flightInfo = {
//           itinerary: itinerary.legIds,
//           link: itinerary.pricingOptions[0]?.items[0]?.deepLink || "N/A",
//           price: itinerary.pricingOptions[0]?.price?.amount || "N/A",
//           carriers: {},
//           depTime: [],
//           arrivalTime: [],
//         };
//         searchList.push(flightInfo);
//       }

//       for (const key in filteredData.legs) {
//         const leg = filteredData.legs[key];
//         for (const flight of searchList) {
//           const index = flight.itinerary.indexOf(key);
//           if (index !== -1) {
//           const timeConverter = (flightTime) =>  {
//             const year = flightTime.year;
//             const month = String(flightTime.month).padStart(2, '0');
//             const day = String(flightTime.day).padStart(2, '0');
//             const hour = String(flightTime.hour).padStart(2, '0');
//             const minute = String(flightTime.minute).padStart(2, '0');
//             const newFlightTime = `${day}-${month}-${year}-${hour}:${minute}`
//             return newFlightTime
//           }
//             flight.depTime[index] = timeConverter(leg.departureDateTime);
//             flight.arrivalTime[index] = timeConverter(leg.arrivalDateTime);
//             const findingCarrier = leg.operatingCarrierIds.map((carrier) => {
//               for (const key in filteredData.carriers) {
//                 const carrier2 = filteredData.carriers[key];
//                 if (key === carrier) {
//                   return {
//                     id: carrier,
//                     name: carrier2.name,
//                     logo: carrier2.imageUrl,
//                   };
//                 }
//               }
//             });
//             flight.carriers[index] = findingCarrier;
//           }
//         }
//       }

//       return searchList.sort((a, b) => a.price - b.price);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// // roundtrip
// // export const SkyscannerApi = async (input) => {
// //     const optionsPost = {
// //       method: "POST",
// //       url: "https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create",
// //       headers: {
// //         "content-type": "application/json",
// //         "X-RapidAPI-Key": "4f8a80ba04msh229a69094db900dp1a1b21jsn0e41b6a8e0ae",
// //         "X-RapidAPI-Host": "skyscanner-api.p.rapidapi.com",
// //       },
// //       data: input,
// //     };
  
// //     return await axios
// //       .request(optionsPost)
// //       .then(function (response) {
// //         const data = response.data.content.results;
// //         const filteredData = {
// //           itineraries: data.itineraries,
// //           legs: data.legs,
// //           carriers: data.carriers,
// //         };
// //         const searchList = [];
  
// //         for (const key in filteredData.itineraries) {
// //           const itinerary = filteredData.itineraries[key];
// //           const flightInfo = {
// //             itinerary: itinerary.legIds,
// //             link: itinerary.pricingOptions[0]?.items[0]?.deepLink || "N/A",
// //             price: itinerary.pricingOptions[0]?.price?.amount || "N/A",
// //             carriers: {},
// //             depTime: [],
// //             arrivalTime: [],
// //           };
// //           searchList.push(flightInfo);
// //         }
  
// //         for (const key in filteredData.legs) {
// //           const leg = filteredData.legs[key];
// //           for (const flight of searchList) {
// //             const index = flight.itinerary.indexOf(key);
// //             if (index !== -1) {
// //               flight.depTime[index] = leg.departureDateTime;
// //               flight.arrivalTime[index] = leg.arrivalDateTime;
// //               const findingCarrier = leg.operatingCarrierIds.map((carrier) => {
// //                 for (const key in filteredData.carriers) {
// //                   const carrier2 = filteredData.carriers[key];
// //                   if (key === carrier) {
// //                     return {
// //                       id: carrier,
// //                       name: carrier2.name,
// //                       logo: carrier2.imageUrl,
// //                     };
// //                   }
// //                 }
// //               });
// //               flight.carriers[index] = findingCarrier;
// //             }
// //           }
// //         }
  
// //         const a = searchList.sort((a, b) => a.price - b.price);
// //         console.log(a);
// //         return a;
// //       })
// //       .catch(function (error) {
// //         console.error(error);
// //       });
// //   };
  
  
  
//   // export const SkyscannerApi = async (input) => {
//   //     const optionsPost = {
//   //       method: "POST",
//   //       url: "https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create",
//   //       headers: {
//   //         "content-type": "application/json",
//   //         "X-RapidAPI-Key": "bc6167339emsh38d646d128f6814p1e8c21jsn7bf49b67bf34",
//   //         "X-RapidAPI-Host": "skyscanner-api.p.rapidapi.com",
//   //       },
//   //       data: input,
//   //     };
//   //     return await axios
//   //       .request(optionsPost)
//   //       .then(function (response) {
//   //         const data = response.data.content.results;
//   //         const filteredData = {
//   //           itineraries: data.itineraries,
//   //           legs: data.legs,
//   //           carriers: data.carriers,
//   //         };
//   //         const searchList = [];
//   //         for (const key in filteredData.itineraries) {
//   //           const itinerary = filteredData.itineraries[key];
//   //           const flightInfo = {
//   //             // origin: input.query.queryLegs[0].originPlaceId.iata,
//   //             // destination: input.query.queryLegs[0].destinationPlaceId.iata,
//   //             itinerary: itinerary.legIds[0],
//   //             link: itinerary.pricingOptions[0]?.items[0]?.deepLink || "N/A",
//   //             price: itinerary.pricingOptions[0]?.price?.amount || "N/A",
//   //             carriers: {},
//   //             depTime: "",
//   //             arrivalTime: "",
//   //           };
//   //           searchList.push(flightInfo);
//   //         }
//   //         for (const legKey in filteredData.legs) {
//   //           const leg = filteredData.legs[legKey];
//   //           const matchingFlight = searchList.find((flight) => flight.itinerary === legKey);
          
//   //           if (matchingFlight) {
//   //             matchingFlight.depTime = leg.departureDateTime;
//   //             matchingFlight.arrivalTime = leg.arrivalDateTime;
          
//   //             const carriers = leg.operatingCarrierIds.map((carrierId) => {
//   //               for (const carrierKey in filteredData.carriers) {
//   //                 if (carrierKey === carrierId) {
//   //                   const carrier = filteredData.carriers[carrierKey];
//   //                   return {
//   //                     id: carrierId,
//   //                     name: carrier.name,
//   //                     logo: carrier.imageUrl,
//   //                   };
//   //                 }
//   //               }
//   //             });
          
//   //             matchingFlight.carriers = carriers;
//   //           }
//   //         }
//   //         const a = searchList.sort((a, b) => a.price - b.price);
//   //         console.log(a);
//   //         return a;
//   //       })
//   //       .catch(function (error) {
//   //         console.error(error);
//   //       });
//   //   };

// // Old sync api
// // export const SkyscannerApi = async (input) => {
// //     const options = {
// //         method: 'POST',
// //         url: process.env.SKAPI_SYNC_BL,
// //         headers: {
// //             'content-type': 'application/json',
// //             'X-RapidAPI-Key': process.env.X_RapidAPI_Key_SYNC_BL,
// //             'X-RapidAPI-Host': process.env.X_RapidAPI_Host_SYNC_BL,
// //         },
// //         data: input,
// //     };
// //     return axios.request(options)
// //         .then( (response: any) => {

// //             const data = response.data.content.results;
// //             const filteredData = {
// //                 itineraries: data.itineraries,
// //                 legs: data.legs,
// //                 carriers: data.carriers,
// //             };
// //             const searchList = [];

// //             for (const key in filteredData.itineraries) {
// //                 const itinerary = filteredData.itineraries[key];
// //                 const flightInfo = {
// //                     itinerary: itinerary.legIds[0],
// //                     link: itinerary.pricingOptions[0]?.items[0]?.deepLink || 'N/A',
// //                     price: itinerary.pricingOptions[0]?.price?.amount || 'N/A',
// //                     carriers: {},
// //                     depTime: '',
// //                     arrivalTime: '',
// //                 };
// //                 searchList.push(flightInfo);
// //             }

// //             for (const key in filteredData.legs) {

// //                 const leg = filteredData.legs[key];
// //                 const matchingFlight = searchList.find(
// //                     (flight) => flight.itinerary === key
// //                 );
// //                 if (matchingFlight) {
// //                     matchingFlight.depTime = leg.departureDateTime;
// //                     matchingFlight.arrivalTime = leg.arrivalDateTime;
// //                     const findingCarrier = leg.operatingCarrierIds.map(carrier => {
// //                         for (const key in filteredData.carriers) {
// //                             const carrier2 = filteredData.carriers[key];
// //                             if (key === carrier){
// //                                 return {id: carrier, name:carrier2.name, logo: carrier2.imageUrl}
// //                             }
// //                         }
// //                     })
// //                     matchingFlight.carriers = findingCarrier
// //                 }
// //             }
// //             searchList.sort((a,b) => a.price - b.price)
// //             return searchList;
// //         })
// //         .catch((error: any) => {
// //             console.error(error);
// //         });
// // }