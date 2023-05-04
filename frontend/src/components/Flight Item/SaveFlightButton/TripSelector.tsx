import React, { useEffect, useState } from "react";
import { fetchTripsData } from "../../../state/slicers/dashboardSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../state/store";

type ListChooserProps = {
  onSave: (listName: string) => void;
  onCancel: () => void;
};

const ListChooser = ({ onSave, onCancel }: ListChooserProps) => {
  const [listName, setListName] = useState("");
  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const trip1 = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchTripsData(userId));
    }
  }, [userId, dispatch]);

  const handleSave = () => {
    onSave(listName);
  };

  return (
    <div className="absolute z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md p-4">
        <h2 className="text-lg font-medium mb-4">Choose a Listsss</h2>
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 rounded-md w-full mb-4"
          placeholder="Enter list name"
          value={listName}
          onChange={(event) => setListName(event.target.value)}
        />
        <ul>
          {trip1.map((trip) => (
            <li key={trip.id}>{trip.name}</li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md mr-4"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-flyplanyellow hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListChooser;
