import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TripItem from "./TripItem/TripItem";
import { BsFillPencilFill } from "react-icons/bs";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { setEditTripState } from "../../state/slicers/editTripSlice";
import EditTrip from "./Edit Trip/EditTrip";

type TripContainer = {
  key: string;
  tripId: string;
  tripName: string;
  itineraries: string;
};

const Trip = (props: TripContainer) => {
  const [toggle, setToggle] = useState(false);
  const [isPencilClicked, setPencilClicked] = useState(false);

  const userId = useSelector((state: RootState) => state.loginReducer.userId);

  return (
    <>
      {isPencilClicked && (
        <EditTrip
          tripId={props.tripId}
          userId={userId}
          tripName={props.tripName}
          setPencilClicked={setPencilClicked}
        />
      )}
      <div className="mt-5 border rounded-md pt-5 pb-0 px-3 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold pr-2">{props.tripName}</h1>
            <BsFillPencilFill
              // className="w-5 h-5 mt-2 ml-1"
              onClick={() => setPencilClicked(true)}
            />
          </div>
          <div id="angle" className="text-3xl font-bold space-x-1">
            {toggle ? (
              <FaAngleDown onClick={() => setToggle(!toggle)} />
            ) : (
              <FaAngleRight onClick={() => setToggle(!toggle)} />
            )}
          </div>
        </div>
        {toggle && (
          <TripItem
            key={props.tripId} // Use a unique identifier from the data itself
            trip={props.itineraries}
            tripId={props.tripId}
            userId={userId}
          />
        )}
      </div>
    </>
  );
};

export { Trip };
