require("dotenv").config();
import axios from "axios";

interface Carrier {
  id: string;
  name: string;
  logo: string;
  imageUrl?: string;
}

interface FlightInfo {
  itinerary: string[];
  link: string;
  price: number | string;
  carriers: Carrier[][];
  depTime: (string | null)[];
  arrivalTime: (string | null)[];
}

interface FilteredData {
  itineraries: any[];
  legs: any[];
  carriers: Record<string, Carrier>;
}

export const skyscannerApi = async (input: any) => {
  const optionsPost = {
    method: "POST",
    url: process.env.SKAPI_ASYNC,
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
    const filteredData: FilteredData = {
      itineraries: data.itineraries,
      legs: data.legs,
      carriers: data.carriers,
    };
    const searchList: FlightInfo[] = [];

    for (const key in filteredData.itineraries) {
        const itinerary = filteredData.itineraries[key];
        const flightInfo: FlightInfo = {
          itinerary: itinerary.legIds,
          link: itinerary.pricingOptions[0]?.items[0]?.deepLink || "N/A",
          price: itinerary.pricingOptions[0]?.price?.amount || "N/A",
          carriers: [],
          depTime: [],
          arrivalTime: [],
        };
        searchList.push(flightInfo);
      }
      for (const key in filteredData.legs) {
        const leg = filteredData.legs[key];
        for (const flight of searchList) {
          const index = flight.itinerary.indexOf(key);
          if (index !== -1) {
            const timeConverter = (flightTime: any) => {
              const year = flightTime.year;
              const month = String(flightTime.month).padStart(2, "0");
              const day = String(flightTime.day).padStart(2, "0");
              const hour = String(flightTime.hour).padStart(2, "0");
              const minute = String(flightTime.minute).padStart(2, "0");
              const newFlightTime = `${day}-${month}-${year}-${hour}:${minute}`;
              return newFlightTime;
            };
            flight.depTime[index] = timeConverter(leg.departureDateTime) as never;
            flight.arrivalTime[index] = timeConverter(leg.arrivalDateTime) as never;
            const findingCarrier = leg.operatingCarrierIds.map((carrier: any) => {
              for (const key in filteredData.carriers) {
                const carrier2 = filteredData.carriers[key];
                if (key === carrier) {
                  if (!carrier2.imageUrl) {
                    return {
                      id: carrier,
                      name: carrier2.name,
                      logo: carrier2.name,
                    };
                  } else {
                    return {
                      id: carrier,
                      name: carrier2.name,
                      logo: carrier2.imageUrl,
                    };
                  }
                }
              }
              // Add a default return value here
              return {
                id: "unknown",
                name: "Unknown Carrier",
                logo: "",
              };
            });
            
            flight.carriers[index] = findingCarrier as never;
            // flight.carriers[index] = findingCarrier as never;
          }
        }
      }
      return searchList.sort((a, b) => Number(a.price) - Number(b.price)); // Convert price to number before subtraction
    })
    .catch((error) => {
      console.log(error, 'Skyscanner Api Error');
      throw error;
    });
};