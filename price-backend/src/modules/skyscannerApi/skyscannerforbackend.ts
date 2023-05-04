require("dotenv").config();
import axios from "axios";

export const skyscannerApiFor = async (input : any ) => {
  const optionsPost = {
    method: "POST",
    url: process.env.SKAPI_SYNC_BL,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
    data: input,
  };
  return await axios
    .request(optionsPost)
    .then(function (response) {
      const data = response.data.content.results;
      const filteredData = {
        itineraries: data.itineraries,
        legs: data.legs,
        carriers: data.carriers,
      };
      const searchList = [];

      for (const key in filteredData.itineraries) {
        const itinerary = filteredData.itineraries[key];
        const flightInfo = {
          itinerary: itinerary.legIds,
          price: itinerary.pricingOptions[0]?.price?.amount || "N/A",
          // link: itinerary.pricingOptions[0]?.items[0]?.deepLink || "N/A",
          // carriers: {},
          // depTime: [],
          // arrivalTime: [],
        };
        searchList.push(flightInfo);
      }

      // for (const key in filteredData.legs) {
      //   const leg = filteredData.legs[key];
      //   for (const flight of searchList) {
      //     const index = flight.itinerary.indexOf(key);
      //     if (index !== -1) {
      //       const timeConverter = (flightTime) => {
      //         const year = flightTime.year;
      //         const month = String(flightTime.month).padStart(2, "0");
      //         const day = String(flightTime.day).padStart(2, "0");
      //         const hour = String(flightTime.hour).padStart(2, "0");
      //         const minute = String(flightTime.minute).padStart(2, "0");
      //         const newFlightTime = `${day}-${month}-${year}-${hour}:${minute}`;
      //         return newFlightTime;
      //       };
      //       flight.depTime[index] = timeConverter(leg.departureDateTime);
      //       flight.arrivalTime[index] = timeConverter(leg.arrivalDateTime);
      //       const findingCarrier = leg.operatingCarrierIds.map((carrier) => {
      //         for (const key in filteredData.carriers) {
      //           const carrier2 = filteredData.carriers[key];
      //           if (key === carrier) {
      //             return {
      //               id: carrier,
      //               name: carrier2.name,
      //               logo: carrier2.imageUrl,
      //             };
      //           }
      //         }
      //       });
      //       flight.carriers[index] = findingCarrier;
      //     }
      //   }
      // }
      return searchList.sort((a, b) => a.price - b.price);
    })
    .catch((error) => {
      console.error(
        `Skyscanner Api Error, ${error.response.status}, ${error.data.message}`
      );
      console.log(error)
      return error;
    });
};