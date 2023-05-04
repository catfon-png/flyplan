import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  deleteTrip,
  fetchTripsData,
} from "../../../state/slicers/dashboardSlice";
import { useSelector } from "react-redux";

type Props = {
  tripId: string;
  userId: string | undefined;
};

const DeleteTrip: React.FC<Props> = ({ tripId, userId = "" }) => {
  const dispatch = useDispatch<AppDispatch>();

  const trip = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );

  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async () => {
    setLoading(true);
    const data = {
      userId: userId,
      tripId: tripId,
    };
    console.log(data.tripId, "tripId");
    try {
      await axios.delete("https://flyplan.onrender.com/api/trip/deletetrip", {
        data,
      });

      const tripDisplayed = trip.filter((item) => item.tripId !== data.tripId);
      dispatch(deleteTrip(tripDisplayed));
      // dispatch(fetchTripsData(userId));

      // Display a success toast
      toast.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
    setLoading(false);
  };

  return (
    <button
      className="text-center text-red-500 border border-red-500 bg-white px-4 py-2 rounded-md hover:bg-red-100"
      onClick={handleDeleteClick}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteTrip;
