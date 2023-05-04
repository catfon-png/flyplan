import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchTripsData } from "../../state/slicers/dashboardSlice";
import { AppDispatch, RootState } from "../../state/store";
import { CreateTrip } from "./Create Trip/CreateTrip";
import NoTripsNoLogin from "./NoTripsNoLogin";
import NoTripsInLogin from "./NoTripsInLogin";

import { Trip } from "./Trip";

const TripContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const [createNewListBox, setCreateNewListBox] = useState(false);

  // states
  const trip = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );
  const loader = useSelector(
    (state: RootState) => state.dashboardReducer.loading
  );

  const userId = useSelector((state: RootState) => state.loginReducer.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTripsData(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      {/* checking state to load lightbox */}
      {createNewListBox && (
        <CreateTrip onClose={() => setCreateNewListBox(false)} />
      )}
        {/* checking state to load lightbox */}
        {createNewListBox && (
          <CreateTrip onClose={() => setCreateNewListBox(false)} />
        )}
        <div className="sm:mx-10 md:mx-40 lg:mx-50 mx-auto mt-10 mb-20">
          {userId && (
            <button
              className="bg-flyplanyellow hover:bg-yellow-500 -mt-7 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
              onClick={() => setCreateNewListBox(true)}
            >
              Create Trip +
            </button>
          )}
        </div>
      <div className="sm:mx-10 md:mx-40 lg:mx-50 mx-auto mt-10">
        {!userId && <NoTripsNoLogin />}

        {!loader && userId && trip?.length > 0
          ? trip.map((trip: any) => {
              return (
                <Trip
                  key={trip.tripId}
                  tripId={trip.tripId}
                  tripName={trip.tripName}
                  itineraries={trip.itineraries}
                />
              );
            })
          : userId && <NoTripsInLogin />}
      </div>
    </>
  );

};

export default TripContainer;
