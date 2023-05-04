import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { IFlightItem } from "../../types";
import { useState } from "react";
import SaveChooseTrip from "../../components/Flight Item/Edit Flight/SaveChooseTrip";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import Flightinfo from "./FlightContent/Flightinfo";

export const FlightItem = (props: IFlightItem) => {
  const replacedImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYqIdkym_2t1jC2VeeJV7_hlsX9EDUdVw3w&usqp=CAU";
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
    departureTimeOneWay,
    departureDateOneWay,
    departureTimeReturn,
    departureDateReturn,
    arrivalTimeOneWay,
    arrivalTimeReturn,
    logoOneWay,
    logoOneWayName,
    logoReturn,
    logoReturnName,
    link,
  } = props;

  const userId = useSelector((state: RootState) => state.loginReducer.userId);
  const isReturnTrip = useSelector(
    (state: RootState) => !state.searchReducer.oneWay
  );

  const [isListOpen, setIsListOpen] = useState(false);
  const [saveFlight, setSaveFlight] = useState(false);

  const handleOpenListClick = () => {
    if (!userId) {
      toast.error("You are not logged in!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
      });
    } else {
      setIsListOpen(true);
    }
  };

  function convertToHoursAndMinutes(minutes: any) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  return (
    <>
      {isListOpen && (
        <SaveChooseTrip
          carrierOneWay={props.carrierOneWay}
          carrierReturn={props.carrierReturn}
          durationOneWay={props.durationOneWay}
          durationReturn={props.durationReturn}
          itineraryOneWay={props.itineraryOneWay}
          itineraryReturn={props.itineraryReturn}
          origin={props.origin}
          cityOrigin={cityOrigin}
          destination={props.destination}
          cityDestination={props.cityDestination}
          price={props.price}
          departureDateOneWay={props.departureDateOneWay}
          departureTimeOneWay={props.departureTimeOneWay}
          arrivalTimeOneWay={props.arrivalTimeOneWay}
          logoOneWay={props.logoOneWay}
          logoOneWayName={props.logoOneWayName}
          departureDateReturn={props.departureDateReturn}
          departureTimeReturn={props.departureTimeReturn}
          arrivalTimeReturn={props.arrivalTimeReturn}
          logoReturn={props.logoReturn}
          logoReturnName={props.logoReturnName}
          link={props.link}
          onClose={() => setIsListOpen(false)}
          setSaveFlight={setSaveFlight}
        />
      )}
      <div className="flight-item border rounded-md p-6 flex flex-col gap-2 mb-3 mt-5">
        <a href={link} target="_blank">
          <div id="oneWayTrip" className="grid grid-cols-4 items-center gap-2">
            {/* <div>{carrierOneWay}</div>
            <div>{carrierReturn}</div> */}

            <div
              className="flex justify-between items-center"
              style={{ width: "400%" }}
            >
              <img
                src={logoOneWay}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = replacedImage;
                }}
                alt={logoOneWayName}
                className="h-12 w-12 object-contain  mr-16 "
              />

              {/* departure */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">{origin}</h3>
                <p className="text-gray-500">{departureTimeOneWay}</p>
              </div>
              {/* end departure */}

              {/* middle content */}
              <div style={{ position: "relative", width: "100%" }}>
                <p className="text-center">
                  {convertToHoursAndMinutes(durationOneWay)}
                </p>
                <div style={{ position: "relative", width: "100%" }}>
                <Flightinfo/>
                </div>
                <p className="text-center">{departureDateOneWay}</p>
              </div>
              {/* end middle content */}

              {/* destination */}
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">{destination}</h3>
                <p>{ }</p>
                <p className="text-gray-500">{departureTimeOneWay}</p>
              </div>
              {/* end destination */}
            </div>
          </div>
          {isReturnTrip && (
            <div id="returnTrip">
              <hr className="border-t my-2" />
              <div className="grid grid-cols-4 items-center gap-2">
                <div
                  className="flex justify-between items-center"
                  style={{ width: "400%" }}
                >
                  <img
                    src={logoReturn}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = replacedImage;
                    }}
                    alt={logoReturnName}
                    className="h-12 w-12 object-contain  mr-16 "
                  />

                  {/* departure */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold">{destination}</h3>
                    <p className="text-gray-500">{arrivalTimeReturn}</p>
                  </div>
                  {/* end departure */}

                  {/* middle content */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <p className="text-center">
                      {convertToHoursAndMinutes(durationReturn)}
                    </p>
                    <div style={{ position: "relative", width: "100%" }}>
                    <Flightinfo/>
                    </div>

                    <p className="text-center">{departureDateReturn}</p>
                  </div>
                  {/* end middle content */}

                  {/* destination */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold">{origin}</h3>
                    <p className="text-gray-500">{departureTimeReturn}</p>
                  </div>
                  {/* end destination */}
                </div>
              </div>
            </div>
          )}
        </a>

        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold">€{price}</div>
          <div className="ml-auto">
            {!saveFlight ? (
              <button
                className="font-normal bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-600 font-semibold py-2 px-4 border border-gray-300 rounded shadow inline"
                onClick={handleOpenListClick}
              >
                <AiOutlineHeart
                  style={{
                    color: "gray",
                    display: "inline",
                    margin: "0 3 0 0",
                  }}
                />
                Save
              </button>
            ) : (
              <button
                className="bg-white hover:bg-green-200 text-green-600 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded shadow inline"
                onClick={handleOpenListClick}
              >
                <AiFillHeart
                  style={{
                    color: "green",
                    display: "inline",
                    margin: "0 3 0 0",
                  }}
                />
                Saved
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
