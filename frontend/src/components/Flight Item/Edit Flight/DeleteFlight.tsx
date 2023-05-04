import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { deleteItem } from "../../../state/slicers/dashboardSlice";
import { useSelector } from "react-redux";

type Props = {
  tripId: string;
  flightUuid: string;
  userId?: string;
};

const DeleteButton: React.FC<Props> = ({ tripId, flightUuid, userId = "" }) => {
  const dispatch = useDispatch<AppDispatch>();

  // if function is not done, show loading status
  const [loading, setLoading] = useState(false);

  const trip = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );
  const handleDeleteClick = async () => {
    setLoading(true);
    const data = {
      userId: userId,
      listName: tripId,
      flightUuid: flightUuid,
    };

    try {
      await axios.delete(
        "https://flyplan.onrender.com/api/flight/deleteflight",
        {
          data,
        }
      );

      // creating a new array to send to payload
      const tripListObject = trip.find((item) => item.tripId === data.listName);
      const tripIndex = trip.findIndex((item) => item.tripId === data.listName);
      const deleteItemIndex = tripListObject.itineraries.findIndex(
        (item: any) => item.uuid === data.flightUuid
      );

      const updatedTripObject = {
        ...tripListObject,
        itineraries: [
          ...tripListObject.itineraries.slice(0, deleteItemIndex),
          ...tripListObject.itineraries.slice(deleteItemIndex + 1),
        ],
      };
      const newListItineraries = [...trip];
      newListItineraries.splice(tripIndex, 1, updatedTripObject);

      dispatch(deleteItem(newListItineraries));

      // Display a success toast
      // toast.success("Flight deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }

    setLoading(false);
  };

  return (
<button
  className="bg-white text-black px-2 py-1 rounded border hover:border-red-500 hover:text-red-500"
  onClick={handleDeleteClick}
  disabled={loading}
>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
