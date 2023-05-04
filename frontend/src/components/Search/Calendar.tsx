import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

type CalendarProps = {
  departureDateErrorMessage: string;
  returnDateErrorMessage: string;
};

export const Calendar = (props: CalendarProps) => {
  const [departureDate, setDepartureDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  const oneWayState = useSelector(
    (state: RootState) => state.searchReducer.oneWay
  );

  const handleDepartureDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col flex-1">
        <label htmlFor="departure-date" className="flex flex-col flex-1">
          <span className="text-gray-600 font-medium mb-2">Departure Date</span>
          <input
            type="date"
            id="departure-date"
            name="departure-date"
            className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-flyplanyellow"
            min={new Date().toISOString().slice(0, 10)}
            onChange={handleDepartureDateChange}
          />
        </label>
        <p className="text-red-600">{props.departureDateErrorMessage}</p>
      </div>
      {!oneWayState && (
        <>
          <div className="flex flex-col flex-1">
            <label className="flex flex-col flex-1">
              <span className="text-gray-600 font-medium mb-2">
                Return Date
              </span>
              <input
                type="date"
                name="return-date"
                className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:border-flyplanyellow"
                min={departureDate}
              />
            </label>
            <p className="text-red-600">{props.returnDateErrorMessage}</p>
          </div>
        </>
      )}
    </div>
  );
};
