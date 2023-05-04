import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './slicers/loginSlice'
import searchReducer from './slicers/searchSlice'
import flightReducer from './slicers/flightSlice'
import dashboardReducer from "./slicers/dashboardSlice";
import autoSuggestReducer from "./slicers/autosuggestSlice";
import savedFlightReducer from "./slicers/savedFlightSlice";
import editTripReducer from "./slicers/editTripSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
    reducer: {
        loginReducer: loginReducer,
        searchReducer: searchReducer,
        flightReducer: flightReducer,
        dashboardReducer: dashboardReducer,
        autosuggestReducer: autoSuggestReducer,
        savedFlightReducer: savedFlightReducer,
        editTripReducer: editTripReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
