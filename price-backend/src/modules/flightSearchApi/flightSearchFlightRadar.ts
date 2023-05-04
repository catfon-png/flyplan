import { IAirportData } from "../../../types";
import axios from "axios";
require("dotenv").config();

export const autoSuggestFlightRadar = async (): Promise<IAirportData> => {
  const options = {
    method: "GET",
    url: process.env.URLFlightRadar,
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.FlightRadar_RapidAPI_Host,
    },
  };
  return (
    axios
      .request(options)
      .then((response) => response.data.rows)
      .then((response) => {
        const data = response.map((item: IAirportData) => ({
          value: item.iata,
          label: `${item.city}, ${item.country}, ${item.name} (${item.iata})`,
        }));
        return data;
      })
      .catch((error) => {
        console.log(error, 'FlightRadar Api Error');
        throw error;
      })
  );
};
