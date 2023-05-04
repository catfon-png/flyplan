import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { FlightItem } from "../Flight Item/FlightItem";
import { getFlight } from "../../state/slicers/flightSlice";
import ButtonShowMore, { initialListDisplay } from "./ButtonShowMore";
import { TInitialListDisplay } from "../../types";
import requestQuery from "./requestQuery";
import { toast } from "react-toastify";
import { FaPlane } from "react-icons/fa";
import "./FlightContainer.css";

export const FlightContainer = () => {
  const dispatch = useDispatch();
  const flightInfo = useSelector((state: RootState) => state.searchReducer);
  const flightItem = useSelector(
    (state: RootState) => state.flightReducer.flights
  );

  const [display, setDisplay] = useState(initialListDisplay);
  const [loading, setLoading] = useState(false);
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const updateProgressBar = () => {
    setPercentLoaded((prevPercent) => {
      if (prevPercent < 100) {
        return prevPercent + 5;
      }
      return prevPercent;
    });
    if (percentLoaded < 100) {
      setTimeout(updateProgressBar, 5000);
    }
  };

  const getFlightData = async () => {
    try {
      const query = requestQuery(flightInfo);
      setLoading(true);
      updateProgressBar();
      return await axios
        .post(
          // "http://localhost:5500/api/flights/",
          "https://flyplan.onrender.com/api/flights/",
          query
        )
        .then((response) => {
          dispatch(getFlight(response.data));
          axios
            .post(
              // "http://localhost:5500/api/flights/get",
              "https://flyplan.onrender.com/api/flights/get",
              query
            )
            .then((response) => dispatch(getFlight(response.data)));
        });
    } catch (error: any) {
      throw error;
    } finally {
      setPercentLoaded(100);
      setTimeout(() => {
        setLoading(false);
        setPercentLoaded(0);
      }, 500);
    }
  };

  useEffect(() => {
    if (flightInfo.sendClicked) {
      getFlightData();
      setDisplay(initialListDisplay);
    }
  }, [flightInfo, errorMessage]);

  const displayedList = (display: TInitialListDisplay) =>
    flightItem.slice(display.first, display.last);

  const getFlighItems = () => {
    const updatedList = displayedList(display);
    return updatedList.map((obj: any, index: number) => {
      const departureDateOneWay = obj.depTime[0].slice(0, 10);
      const departureDateReturn = obj.depTime[1]?.slice(0, 10);
      const itineraryOneWay = obj.itinerary[0];
      const itineraryReturn = obj.itinerary[1];

      return (
        <FlightItem
          key={index}
          carrierOneWay={obj.carriers[0][0].name}
          carrierReturn={obj.carriers[1]?.[0]?.name}
          durationOneWay={obj.duration[0]}
          durationReturn={obj.duration[1]}
          itineraryOneWay={itineraryOneWay}
          itineraryReturn={itineraryReturn}
          cityOrigin={obj.originPlaceName[0]}
          origin={flightInfo.origin?.toUpperCase()}
          cityDestination={obj.destinationPlaceName[0]}
          destination={flightInfo.destination.toUpperCase()}
          price={obj.price}
          departureDateOneWay={departureDateOneWay}
          departureTimeOneWay={`${obj.depTime[0].slice(11, 16)}`}
          arrivalTimeOneWay={`${obj.arrivalTime[0].slice(11, 16)}`}
          logoOneWay={obj.carriers[0][0].logo}
          logoOneWayName={obj.carriers[0][0].name}
          departureDateReturn={departureDateReturn}
          departureTimeReturn={`${obj.depTime[1]?.slice(11, 16)}`}
          arrivalTimeReturn={`${obj.arrivalTime[1]?.slice(11, 16)}`}
          logoReturn={obj.carriers[1]?.[0]?.logo}
          logoReturnName={obj.carriers[1]?.[0]?.name}
          link={obj.link}
        />
      );
    });
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-2 bg-white rounded-full mt-10">
          <div
            className="h-full bg-flyplanyellow rounded-full transition-all duration-1500"
            style={{ width: `${percentLoaded}%` }}
          >
          <FaPlane
          className="text-yellow-600 plane-icon relative -top-4 -mt-5 ml-5 w-10 h-10 transition-all duration-1500"
          style={{
            left: `${percentLoaded}%`,
            transform: `translateX(-${percentLoaded}%)`,
          }}
          
          />
          </div>
        </div>
      ) : flightItem.length > 0 ? (
        <div>
          <div>{getFlighItems()}</div>
          {flightItem.length > display.last && (
            <ButtonShowMore
              getFlightItems={() => getFlighItems()}
              display={display}
              setDisplay={setDisplay}
            />
          )}
        </div>
      ) : (
        <p className="text-center">{errorMessage}</p>
      )}
    </div>
  );
};
