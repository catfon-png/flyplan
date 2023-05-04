import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOptionAirportSelect } from '../../types';

interface autoSuggestState {
    airportList: any[]
    dataOrigin: IOptionAirportSelect[];
    dataDestination: IOptionAirportSelect[];
    selectedValueOrigin: string;
    selectedValueDestination: string;
  }

  const initialState: autoSuggestState = {
    airportList: [],
    dataOrigin: [],
    dataDestination: [],
    selectedValueOrigin: '',
    selectedValueDestination: '',
  };
  

export const autoSuggestSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setInputAutoDataOrigin: (state, action: PayloadAction< IOptionAirportSelect[]>) => {
            state.dataOrigin = action.payload;
        },
        setInputAutoDataDestination: (state, action: PayloadAction< IOptionAirportSelect[]>) => {
            state.dataDestination = action.payload;
        },
        setSelectedValueOrigin: (state, action: PayloadAction<string>) => {
            state.selectedValueOrigin = action.payload;
        },
        setSelectedValueDestination: (state, action: PayloadAction<string>) => {
            state.selectedValueDestination = action.payload;
        },
        setAirportList: (state, action: PayloadAction<[]>) => {
            state.airportList = action.payload;
        },
    }
})

export const {
    setInputAutoDataOrigin,
    setInputAutoDataDestination,
    setSelectedValueOrigin,
    setSelectedValueDestination,
    setAirportList
  } = autoSuggestSlice.actions;
  
  export default autoSuggestSlice.reducer;