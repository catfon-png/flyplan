export interface Root {
    trips: Trip[]
  }
  
  export interface Trip {
    tripId: number
    tripName: string
    itineraries: Itinerary[]
  }
  
  export interface Itinerary {
    itineraryId: string
    origin: Origin
    destination: Destination
    airline: string
    departureTime: string
    arrivalTime: string
    priceHistory: PriceHistory[]
  }
  
  export interface Origin {
    cityName: string
    IATA: string
  }
  
  export interface Destination {
    cityname: string
    IATA: string
  }
  
  export interface PriceHistory {
    timeStamp: string
    price: number
  }
  export interface IAirportData {
    city: string,
    country: string,
    name: string,
    iata: string,
 }

 export type FlightData = {
  origin: string;
  destination: string;
  price: number;
  link: string;
  oneWayDate: string;
  itineraryOneWay: number;
  departureTimeOneWay: string;
  arrivalTimeOneWay: string;
  logoOneWay: string;
  returnDate?: string;
  itineraryReturn?: number;
  departureTimeReturn?: string;
  arrivalTimeReturn?: string;
  logoReturn?: string;
};

export type SaveFlightButtonProps = {
  itineraryOneWay: number;
  itineraryReturn?: number;
  origin: string;
  destination: string;
  price: number;
  departureDateOneWay: string;
  departureTimeOneWay: string;
  departureTimeReturn?: string;
  arrivalTimeOneWay: string;
  departureDateReturn?: string;
  arrivalTimeReturn?: string;
  logoOneWay: string;
  logoReturn?: string;
  link: string;
};