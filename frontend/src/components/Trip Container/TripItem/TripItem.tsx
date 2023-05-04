import React from "react";
import DeleteFlight from "../../Flight Item/Edit Flight/DeleteFlight";
import Flightinfo from "../../Flight Item/FlightContent/Flightinfo";

type TripItemProps = {
  trip: any;
  userId?: string;
  tripId: string;
};

const TripItem: React.FC<TripItemProps> = ({ trip, userId, tripId }) => {

            function getDayAndDate(dateStr : string) {
            const date = new Date(dateStr);
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[date.getDay()];
            const dateNum = date.getDate();
            return `${dayName}, ${dateStr}`;
          }

  const replacedImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYqIdkym_2t1jC2VeeJV7_hlsX9EDUdVw3w&usqp=CAU";
  return (
    <>
      {trip.length > 0 &&
        trip.map((trip: any, index: number) => {
          const {
            link,
            logoOneWay,
            logoOneWayName,
            origin,
            destination,
            durationOneWay,
            durationReturn,
            oneWayDate,
            returnDate,
            departureTimeOneWay,
            arrivalTimeOneWay,
            arrivalTimeReturn,
            logoReturn,
            logoReturnName,
            departureTimeReturn,
            priceHistory,
            uuid,
          } = trip;

          
          function convertToHoursAndMinutes(minutes: any) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
          }
          


          return (
            <div key={index} className="" style={{ backgroundColor: '#F4F4F4' }}>
              <div className="flight-item border rounded-md p-6 flex flex-col gap-2 mb-3 mt-5">
                <a href={link} target="_blank">
                  <div
                    id="oneWayTrip"
                    className="grid grid-cols-4 items-center gap-2"
                  >
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
                        className="h-12 w-12 object-contain mr-16"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-semibold">
                          {origin && origin.cityName}
                        </h3>
                        <p className="text-gray-500">{departureTimeOneWay}</p>
                      </div>
                      <div style={{ position: "relative", width: "100%" }}>
                        <p className="text-center">
                          {convertToHoursAndMinutes(durationOneWay)}
                        </p>
                        <div style={{ position: "relative", width: "100%" }}>
                          <Flightinfo />
                        </div>
                        <p className="text-center">{oneWayDate}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-semibold">
                          {destination && destination.cityName}
                        </h3>
                        <p>{ }</p>
                        <p className="text-gray-500">{arrivalTimeOneWay}</p>
                      </div>
                    </div>
                  </div>
                </a>
                {arrivalTimeReturn && (
                  <div id="returnTrip">
                    <hr className="border-t my-2" />
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <div className="grid grid-cols-4 items-center gap-2">
                        <div
                          className="flex justify-between items-center"
                          style={{ width: "400%" }}
                        >
                          <img
                            src={logoReturn}
                            alt={logoReturnName}
                            className="h-12 w-12 object-contain mr-16"
                            onError={(e) => {
                              e.currentTarget.src = replacedImage;
                            }}
                          />
                          <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold">
                              {destination && destination.cityName}
                            </h3>
                            <p className="text-gray-500">{departureTimeReturn}</p>
                          </div>
                          <div style={{ position: "relative", width: "100%" }}>
                            <p className="text-center">
                            {convertToHoursAndMinutes(durationReturn)}
                            </p>
                            <div style={{ position: "relative", width: "100%" }}>
                              <Flightinfo />
                            </div>
                            <p className="text-center">{returnDate}</p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold">
                              {origin && origin.cityName}
                            </h3>
                            <p>{ }</p>
                            <p className="text-gray-500">{arrivalTimeReturn}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">
                      €{priceHistory?.[0]?.price}
                    </div>
                    <div className="text-gray-500">
                      {getDayAndDate(priceHistory?.[0]?.timeStamp.split(',')[0]) }
                    </div>
                  </div>
                  <DeleteFlight
                    tripId={tripId}
                    flightUuid={uuid}
                    userId={userId}
                  />
                </div>


              </div>
            </div>
          );
        })}
    </>
  );

};

export default TripItem;
