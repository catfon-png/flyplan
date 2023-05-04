export interface IFlightItem {
  carrierOneWay: string;
  carrierReturn?: string;
  durationOneWay: number[];
  durationReturn: number[];
  itineraryOneWay: number;
  itineraryReturn?: number;
  origin: string;
  cityOrigin: string;
  destination: string;
  cityDestination: string;
  price: number;
  departureDateOneWay: string;
  departureTimeOneWay: string;
  departureTimeReturn?: string;
  departureDateReturn?: string;
  arrivalTimeOneWay: string;
  arrivalTimeReturn?: string;
  logoOneWay: string;
  logoOneWayName: string;
  logoReturn?: string;
  logoReturnName?: string;
  link: string;
};

export interface IFlightList {
  flights: IFlightItem[];
}

export interface IFlightState {
  flights: IFlightList[];
}
export interface IOptionAirportSelect {
  value: string,
  label: string
}

export type ButtonShowMoreProps = {
  getFlightItems: () => any;
  display: TInitialListDisplay;
  setDisplay: any;
};

export type TInitialListDisplay = {
  first: number;
  last: number;
};

export interface SaveFlightButtonProps extends IFlightItem {
  onClose: () => void;
  setSaveFlight: (value: boolean) => void;
};

export type TflightToDelete = {
  userId: string,
  listName: string,
  flightUuid: string,
};
