import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISavedFlight {
    savedState: boolean,
}

const initialState: ISavedFlight = {
    savedState: false,
}

export const savedFlightSlice = createSlice({
    name: 'savedFlight',
    initialState,
    reducers:{
        setSavedState: (state, action: PayloadAction<boolean>) => {
            state.savedState = action.payload
        },
        toggleSavedState: (state, action: PayloadAction<boolean>) => {
            state.savedState = !state.savedState
        }
    }
})

export const { setSavedState, toggleSavedState } = savedFlightSlice.actions
export default savedFlightSlice.reducer;