import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEditTrip {
    value: boolean
}

const initialState: IEditTrip = {
    value: false
}

export const editTripSlice = createSlice({
    name: 'editTrip',
    initialState,
    reducers: {
        setEditTripState: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        }
    }
})

export const { setEditTripState } = editTripSlice.actions
export default editTripSlice.reducer;