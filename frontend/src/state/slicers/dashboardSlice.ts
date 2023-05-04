import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DashboardState {
  tripsData: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  tripsData: [],
  loading: false,
  error: null,
};

export const fetchTripsData = createAsyncThunk(
  "dashboard/fetchTripsData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://flyplan.onrender.com/api/flight/user/", {
        userId: userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    emptyDashboard: (state, action: PayloadAction) => {
      state.tripsData = []
    },
    deleteItem: (state, action: PayloadAction<any[]>) => {
      state.tripsData = action.payload
    },
    deleteTrip: (state, action: PayloadAction<any[]>) => {
      state.tripsData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripsData.fulfilled, (state, action) => {
        state.loading = false;
        state.tripsData = action.payload;
      })
      .addCase(fetchTripsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { emptyDashboard, deleteItem, deleteTrip } = dashboardSlice.actions
export default dashboardSlice.reducer;
