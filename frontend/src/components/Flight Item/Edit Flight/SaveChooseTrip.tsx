import { useSelector, useDispatch } from "react-redux";
import { fetchTripsData } from "../../../state/slicers/dashboardSlice";
import { RootState, AppDispatch } from "../../../state/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IFlightItem, SaveFlightButtonProps } from "../../../types";
import { CreateTrip } from "../../Trip Container/Create Trip/CreateTrip";
import { FlightItem } from "../FlightItem";

export default function SaveChooseTrip({
  onClose,
  ...props
}: SaveFlightButtonProps) {
  const isReturnTrip = useSelector(
    (state: RootState) => !state.searchReducer.oneWay
  );

  const {
    carrierOneWay,
    carrierReturn,
    durationOneWay,
    durationReturn,
    itineraryOneWay,
    itineraryReturn,
    origin,
    cityOrigin,
    destination,
    cityDestination,
    price,
    departureDateOneWay,
    departureTimeOneWay,
    departureTimeReturn,
    departureDateReturn,
    arrivalTimeOneWay,
    arrivalTimeReturn,
    logoOneWay,
    logoOneWayName,
    logoReturn,
    logoReturnName,
    link,
    setSaveFlight,
  } = props;

  const flightData: IFlightItem = {
    carrierOneWay,
    carrierReturn,
    durationOneWay,
    durationReturn,
    origin,
    cityOrigin,
    destination,
    cityDestination,
    price,
    link,
    departureDateOneWay: departureDateOneWay,
    itineraryOneWay,
    departureTimeOneWay,
    arrivalTimeOneWay,
    logoOneWay,
    logoOneWayName,
  };

  if (
    isReturnTrip &&
    itineraryReturn &&
    departureDateReturn &&
    departureTimeReturn &&
    arrivalTimeReturn &&
    logoReturn &&
    logoReturnName
  ) {
    flightData.departureDateReturn = departureDateReturn;
    flightData.itineraryReturn = itineraryReturn;
    flightData.departureTimeReturn = departureTimeReturn;
    flightData.arrivalTimeReturn = arrivalTimeReturn;
    flightData.logoReturn = logoReturn;
    flightData.logoReturnName = logoReturnName;
  }

  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const tripsData = useSelector(
    (state: RootState) => state.dashboardReducer.tripsData
  );
  const loading = useSelector(
    (state: RootState) => state.dashboardReducer.loading
  );
  const error = useSelector((state: RootState) => state.dashboardReducer.error);

  const [selectedTrip] = useState("");
  const [createNewListBox, setCreateNewListBox] = useState(false);

  useEffect(() => {
    if (selectedTrip) {
      saveFlight(selectedTrip);
    }
  }, [selectedTrip]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTripsData(userId));
    }
  }, [userId, dispatch]);

  const saveFlight = async (tripUuid: string) => {
    if (!userId) {
      // Show toast with unsuccessful message that the user is not logged in
      toast.error("You are not logged in!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 6000,
      });
      return;
    }
    try {
      await axios.patch(
        `https://flyplan.onrender.com/api/flight/saveflight`,
        // "http://localhost:5500/api/flight/saveflight",
        {
          userId: userId,
          flightItem: flightData,
          tripUuid,
        }
      );      
    } catch (error) {
      // Show the toast with error message when there's an error from the server or when the saveFlight function fails to trigger
      toast.error("Failed to save flight", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 3000,
        onClose: () => {
          onClose();
        },
      });
      console.error(error);
    }
  };

  return (
    <>
      {createNewListBox ? (
        <CreateTrip onClose={() => setCreateNewListBox(false)} />
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white rounded-md p-6 flex flex-col gap-4 w-11/12 mx-auto border border-black max-w-md">
            <h1 className="text-3xl font-bold text-black py-4">Save to trip</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              tripsData.length > 0 && (
                <div className="space-y-2">
                  {tripsData.map((trip, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        saveFlight(trip.tripId);
                        setSaveFlight(true);
                        onClose();
                      }}
                      className=" border border-black block w-full text-left py-2 px-4 bg-white hover:bg-gray-100 rounded-md"
                    >
                      {trip.tripName}
                    </button>
                  ))}
                </div>
              )
            )}
            <hr></hr>
            <div className="flex items-center justify-between">
              <button
                className="self-start mt-4 text-flyplanyellow px-4 py-2 rounded-md"
                onClick={() => setCreateNewListBox(true)}
              >
                Create Trip
              </button>
              <button
                onClick={onClose}
                className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"

                // className="self-end mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
            {/* checking state to load lightbox */}
            {createNewListBox && (
              <CreateTrip onClose={() => setCreateNewListBox(false)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

// "{\"userId\":\"zWtRrzQxOIh8PCUN11g5RzBmVlE3\",\"flightItem\":{\"carrierOneWay\":\"transavia\",\"durationOneWay\":490,\"origin\":\"AMS\",\"cityOrigin\":[\"Amsterdam\"],\"destination\":\"MAD\",\"cityDestination\":[\"Madrid\"],\"price\":\"178.99\",\"link\":\"https://www.skyscanner.net/transport_deeplink/4.0/NL/en-GB/EUR/sunl/1/9451.13870.2023-04-21/air/trava/flights?itinerary=flight|-31748|5955|9451|2023-04-21T09:10|13577|2023-04-21T11:15|185|-|-|-;flight|-32356|7653|13577|2023-04-21T15:00|13870|2023-04-21T17:20|80|-|-|-&carriers=-31748,-32356&operators=-31748;-32356&passengers=1&channel=website&cabin_class=economy&facilitated=false&fps_session_id=76690de0-ba23-4dc2-972d-b38b4d72ed16&ticket_price=178.99&is_npt=false&is_multipart=false&client_id=skyscanner_website&request_id=a76934fb-0549-4748-b632-79e92d362bed&q_ids=H4sIAAAAAAAA_-OS4mIpLs3LEWLmeO0pxcyxLkehYUn7IjYjJgVGADXZKD4cAAAA|3111497365165675689|2&q_sources=JACQUARD&commercial_filters=false&q_datetime_utc=2023-04-06T06:37:50&transfer_protection=protected&pqid=true\",\"departureDateOneWay\":\"21-04-2023\",\"itineraryOneWay\":\"9451-2304210910--31748,-32356-1-13870-2304211720\",\"departureTimeOneWay\":\"09:10\",\"arrivalTimeOneWay\":\"17:20\",\"logoOneWay\":\"https://logos.skyscnr.com/images/airlines/HV.png\",\"logoOneWayName\":\"transavia\"},\"tripUuid\":\"85d26346-20d0-44d6-926f-15ca8a000057\"}";
