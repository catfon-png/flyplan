const requestQuery = (flightInfo: any) => {
  const isRoundTrip = !flightInfo.oneWay;

  const returnQuery = {
    query: {
      market: "NL",
      locale: "en-GB",
      currency: "EUR",
      queryLegs: [
        {
          originPlaceId: {
            iata: flightInfo.origin.toUpperCase(),
          },
          destinationPlaceId: {
            iata: flightInfo.destination.toUpperCase(),
          },
          date: {
            year: Number(flightInfo.departureDate.slice(0, 4)),
            month: Number(flightInfo.departureDate.slice(5, 7)),
            day: Number(flightInfo.departureDate.slice(8)),
          },
        },
        ...(isRoundTrip
          ? [
            {
              originPlaceId: {
                iata: flightInfo.destination?.toUpperCase(),
              },
              destinationPlaceId: {
                iata: flightInfo.origin?.toUpperCase(),
              },
              date: {
                year: Number(flightInfo.returnDate?.slice(0, 4)),
                month: Number(flightInfo.returnDate?.slice(5, 7)),
                day: Number(flightInfo.returnDate?.slice(8)),
              },
            },
          ]
          : []),
      ],
      cabinClass: "CABIN_CLASS_ECONOMY",
      adults: 1,
    }
  }

  return returnQuery;
};

export default requestQuery;
