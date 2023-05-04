import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFlight {
    origin: string;
    destination: string;
    departureDate: string;
    oneWay: boolean;
    returnDate?: string;
    sendClicked: boolean; // Add this line
}

const initialState: IFlight = {
    origin: "",
    destination: "",
    departureDate: "",
    oneWay: false,
    returnDate: "",
    sendClicked: false, // Add this line
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getFlightInfo: (state, action: PayloadAction<IFlight>) => {
            state.origin = action.payload.origin;
            state.destination = action.payload.destination;
            state.departureDate = action.payload.departureDate;
            state.returnDate = action.payload.returnDate;
            state.oneWay = action.payload.oneWay;
        },
        resetSearch: (state, action: PayloadAction) => {
            state.origin = '';
            state.destination = '';
            state.departureDate = '';
            state.returnDate = '';
            state.oneWay = false;
            state.sendClicked = false;
        },
        toggleOneWay: (state, action: PayloadAction<boolean>) => {
            state.oneWay = !state.oneWay
        },
        setSendClicked: (state, action: PayloadAction<boolean>) => {
            state.sendClicked = action.payload;
        },
    }
})

export const { getFlightInfo, toggleOneWay, setSendClicked, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;