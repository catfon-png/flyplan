import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFlightList, IFlightState } from "../../types";

const initialState: IFlightState = {
    flights: []
}

export const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        getFlight: (state, action: PayloadAction<IFlightList[]>) => {
            state.flights = action.payload
        },
        resetFlightData: (state, action: PayloadAction) => {
            state.flights = []
        }
    },
})

export const { getFlight, resetFlightData } = flightSlice.actions
export default flightSlice.reducer;
