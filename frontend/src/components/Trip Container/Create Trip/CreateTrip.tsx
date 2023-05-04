import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { fetchTripsData } from "../../../state/slicers/dashboardSlice";
import { toast } from "react-toastify";

type ListProps = {
  onClose: () => void;
};

const CreateTrip = ({ onClose }: ListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const [newListName, setNewListName] = useState("");

  const handleNewListSubmit = async () => {
    if (newListName.trim()) {
      try {
        await axios.post("https://flyplan.onrender.com/api/trip/addtrip", {
          userId: userId,
          listName: newListName,
        });
        setNewListName("");
        onClose();
        if (userId) {
          dispatch(fetchTripsData(userId));
          toast.success("Trip created successfully!");
        }
      } catch (error) {
        console.error(error, "Error creating new trip:");
      }
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      // add a conditional check to ensure that the current property is not null
      inputRef.current.focus(); // call the focus method on the current property
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
      <div className="bg-white rounded-md p-6 flex flex-col gap-4 w-11/12 mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-black py-4">
          Create New Trip
        </h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New trip name"
            className="border rounded px-2 py-1 mr-2 w-4/5 focus:outline-none focus:border-flyplanyellow"
          />
          <button
            onClick={handleNewListSubmit}
                className="bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-100 font-semibold py-2 px-4 border-2 border-gray-300 rounded-md shadow ml-2 h-10 items-end">

            {/* className="bg-flyplanyellow hover:bg-yellow-500 text-white px-4 py-2 rounded" */}
          
            Save
          </button>
        </div>
        <button
          onClick={onClose}
          className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { CreateTrip };
