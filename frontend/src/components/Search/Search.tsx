import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { getAutoSuggest } from "../../helpers/autoSuggest";
import {
  getFlightInfo,
  toggleOneWay,
  setSendClicked,
} from "../../state/slicers/searchSlice";
import { setAirportList } from "../../state/slicers/autosuggestSlice";
import { toast } from "react-toastify";
import "./Search.css";
import { AutoSelect } from "./AutoSelect";
import { Calendar } from "./Calendar";

const Search = () => {
  const dispatch = useDispatch();
  const [returnDateErrorMessage, setReturnDateErrorMessage] = useState("");
  const [departureDateErrorMessage, setDepartureDateErrorMessage] =
    useState("");
  const [destinationErrorMessage, setDestinationErrorMessage] = useState("");

  //Global states
  const oneWayState = useSelector(
    (state: RootState) => state.searchReducer.oneWay
  );
  const selectedOriginState = useSelector(
    (state: RootState) => state.autosuggestReducer.selectedValueOrigin
  );
  const selectedDestinationState = useSelector(
    (state: RootState) => state.autosuggestReducer.selectedValueDestination
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAutoSuggest();
      dispatch(setAirportList(data));
    };
    getData();
  }, []);

  const getFlightData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const origin = selectedOriginState;
    const destination = selectedDestinationState;
    const departureDate = formData.get("departure-date") as string;
    const returnDate = formData.get("return-date") as string;
    const oneWay = oneWayState;

    // validation
    if (!origin) {
      toast.error("Fill in the spaces. Where do you wanna go next?");
      return;
    }
    if (origin && !destination) {
      setDestinationErrorMessage("Fill in destination");
      setTimeout(() => setDestinationErrorMessage(""), 3000);
      return;
    }
    if (origin && destination && origin === destination) {
      setDestinationErrorMessage("Destination can't be the same as origin");
      setTimeout(() => setDestinationErrorMessage(""), 3000);
      return;
    }
    if (origin && destination && !departureDate) {
      setDepartureDateErrorMessage("Fill in the date");
      setTimeout(() => setDepartureDateErrorMessage(""), 3000);
      return;
    }
    if (
      origin &&
      destination &&
      departureDate &&
      oneWay === false &&
      !returnDate
    ) {
      setReturnDateErrorMessage("Select a return date");
      setTimeout(() => setReturnDateErrorMessage(""), 3000);
      return;
    }

    dispatch(
      getFlightInfo({
        origin,
        destination,
        departureDate,
        returnDate,
        oneWay,
        sendClicked: true,
      })
    );
    // dispatch the setSendClicked action after dispatching the getFlightInfo action
    dispatch(setSendClicked(true));
  };

  return (
    <>
      <section className="bg-white rounded-md p-6 mb-10">
        <form className="flex flex-col space-y-4" onSubmit={getFlightData}>
          <AutoSelect errorMessage={destinationErrorMessage}/>
          <Calendar
            returnDateErrorMessage={returnDateErrorMessage}
            departureDateErrorMessage={departureDateErrorMessage}
          />
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">One Way Flight</span>
              <div
                className={`${
                  oneWayState ? "bg-flyplanyellow" : "bg-gray-400"
                } relative inline-flex items-center h-6 rounded-full w-11`}
                onClick={() => dispatch(toggleOneWay(oneWayState))}
              >
                <span className="sr-only">Toggle One Way</span>
                <span
                  className={`${
                    oneWayState
                      ? "translate-x-6 transition-all"
                      : "translate-x-1 transition-all"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-flyplanyellow hover:bg-aqua-700 rounded-md px-4 py-2 text-white rounded hover:bg-yellow-500 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Search;
