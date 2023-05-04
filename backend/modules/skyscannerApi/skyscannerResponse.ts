import { Cities, FilteredData, FlightInfo } from './types'

export const manageResponse = (data: any) => {

    const filteredData: FilteredData = {
        itineraries: data.itineraries,
        legs: data.legs,
        carriers: data.carriers,
        cities: data.places,
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
            duration: [],
            // originPlaceId: [],
            originPlaceName: [],
            // destinationPlaceId: [],
            destinationPlaceName: [],

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
                flight.duration[index] = Number(leg.durationInMinutes);
                // flight.originPlaceId[index] = leg.originPlaceId;
                // flight.destinationPlaceId[index] = leg.destinationPlaceId;

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
                const cityName = (id: any) => {
                    const citiesAndAirportDetails: Cities[] = Object.values(filteredData.cities)
                    const airportDetails = citiesAndAirportDetails.find((item: Cities) => item.entityId === id)
                    const findingCityName = citiesAndAirportDetails.find((item: Cities) => item.entityId === airportDetails?.parentId)
                    return findingCityName!.name
                }
                flight.originPlaceName[index] = cityName(leg.originPlaceId)
                flight.destinationPlaceName[index] = cityName(leg.destinationPlaceId)
                flight.carriers[index] = findingCarrier as never;
            }
        }
    }
    return searchList.sort((a, b) => Number(a.price) - Number(b.price)); // Convert price to number before subtraction
}