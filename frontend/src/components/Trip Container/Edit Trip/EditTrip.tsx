import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
// import DeleteTrip from './DeleteTrip'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";
import { fetchTripsData } from "../../../state/slicers/dashboardSlice";
import { toast } from "react-toastify";
import { setEditTripState } from "../../../state/slicers/editTripSlice";

type Props = {
  tripId: string;
  tripName: string;
  userId: string | undefined;
  setPencilClicked: Dispatch<SetStateAction<boolean>>;
};

const EditTrip = ({ tripId, userId, tripName, setPencilClicked }: Props) => {
  const [newTripName, setNewTripName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  //   const [loading, setLoading] = useState(false);

  const handleDeleteClick = async () => {
    // setLoading(true);
    const data = {
      userId: userId,
      tripId: tripId,
    };
    try {
      await axios.delete("https://flyplan.onrender.com/api/trip/deletetrip", {
        data,
      });

      dispatch(fetchTripsData(userId!));

      // Display a success toast
      toast.success("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
    // setLoading(false);
  };
  const updateTripName = async (tripId: string, newTripName: string) => {
    try {
      const res = await fetch(
        `https://flyplan.onrender.com/api/trip/changeTripName`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tripId: tripId,
            newName: newTripName,
            userId: userId,
          }),
        }
      );

      if (res.status === 200) {
        if (userId) {
          dispatch(fetchTripsData(userId));
          toast.success("Trip name changed successfully!");
        }
      } else {
        throw new Error("Failed to update trip");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-40 z-10">
      <div className="bg-white rounded-md p-6 flex flex-col gap-4 w-11/12 mx-auto flex items-left justify-center max-w-md">
        <div className="">
          <h1 className="text-2xl flex inline content-start font-bold">
            Edit Trip
          </h1>
        </div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Choose a new name"
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-flyplanyellow w-11/20"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
          />
          <button
            className="bg-white text-gray-400 hover:text-green-600 font-semibold py-2 px-4 border border-gray-300 rounded shadow inline w-20 ml-10 w-8/20 h-10 items-end"
            onClick={async () => {
              await updateTripName(tripId, newTripName);
            }}
          >
            Save
          </button>
        </div>

        <hr></hr>
        <p className="flex content-center">Or delete your trip</p>
        {/* <DeleteTrip tripId={tripId} userId={userId} /> */}
        <button
          onClick={handleDeleteClick}
          className="bg-white text-red-500 px-2 py-1 rounded hover:bg-red-100 hover:text-red-500 w-full border-solid border-2 border-red-400 mb-3"
        >
          Delete
        </button>
        <hr></hr>
        <button
          onClick={() => setPencilClicked(false)}
          className="self-end bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTrip;
