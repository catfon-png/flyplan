import React from "react";

export default function SaveFlightButton() {
  return <div>SaveFlightButton</div>;
}

// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../state/store";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

// type FlightData = {
//   origin: string;
//   destination: string;
//   price: number;
//   link: string;
//   oneWayDate: string;
//   itineraryOneWay: number;
//   departureTimeOneWay: string;
//   arrivalTimeOneWay: string;
//   logoOneWay: string;
//   returnDate?: string;
//   itineraryReturn?: number;
//   departureTimeReturn?: string;
//   arrivalTimeReturn?: string;
//   logoReturn?: string;
// };

// type SaveFlightButtonProps = {
//   itineraryOneWay: number;
//   itineraryReturn?: number;
//   origin: string;
//   destination: string;
//   price: number;
//   departureDateOneWay: string;
//   departureTimeOneWay: string;
//   departureTimeReturn?: string;
//   arrivalTimeOneWay: string;
//   departureDateReturn?: string;
//   arrivalTimeReturn?: string;
//   logoOneWay: string;
//   logoReturn?: string;
//   link: string;
// };

// const SaveFlightButton = (props: SaveFlightButtonProps) => {
//   const {
//     itineraryOneWay,
//     itineraryReturn,
//     origin,
//     destination,
//     price,
//     departureDateOneWay,
//     departureTimeOneWay,
//     departureTimeReturn,
//     departureDateReturn,
//     arrivalTimeOneWay,
//     arrivalTimeReturn,
//     logoOneWay,
//     logoReturn,
//     link,
//   } = props;

//   const userId = useSelector((state: RootState) => state.loginReducer.userId);
//   const isReturnTrip = useSelector(
//     (state: RootState) => !state.searchReducer.oneWay
//   );

//   const flightData: FlightData = {
//     origin,
//     destination,
//     price,
//     link,
//     oneWayDate: departureDateOneWay,
//     itineraryOneWay,
//     departureTimeOneWay,
//     arrivalTimeOneWay,
//     logoOneWay,
//   };

//   if (
//     isReturnTrip &&
//     itineraryReturn &&
//     departureDateReturn &&
//     departureTimeReturn &&
//     arrivalTimeReturn &&
//     logoReturn
//   ) {
//     flightData.returnDate = departureDateReturn;
//     flightData.itineraryReturn = itineraryReturn;
//     flightData.departureTimeReturn = departureTimeReturn;
//     flightData.arrivalTimeReturn = arrivalTimeReturn;
//     flightData.logoReturn = logoReturn;
//   }

//   const saveFlight = async () => {
//     if (!userId) {
//       // Show toast with unsuccessful message that the user is not logged in
//       toast.error("You are not logged in!", {
//         position: toast.POSITION.BOTTOM_CENTER,
//         autoClose: 6000,
//       });
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `http://localhost:5500/api/flight/user/saveflight`,
//         {
//           userId: userId,
//           flightItem: flightData,
//         }
//       );
//       // Show the toast after successfully saving the flight
      // toast.success("Flight saved successfully", {
      //   position: toast.POSITION.BOTTOM_CENTER,
      //   autoClose: 6000,
      // });
//     } catch (error) {
//       // Show the toast with error message when there's an error from the server or when the saveFlight function fails to trigger
//       toast.error("Failed to save flight", {
//         position: toast.POSITION.BOTTOM_CENTER,
//         autoClose: 3000,
//       });
//       console.error(error);
//     }
//   };

//   return (
//     <>
//     {/* <button
//       className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
//       onClick={saveFlight}
//     >
//       Save
//     </button> */}
//     </>
//   );
// };

// export default SaveFlightButton;
