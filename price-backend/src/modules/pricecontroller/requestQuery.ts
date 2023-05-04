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
              iata: flightInfo.origin,
            },
            destinationPlaceId: {
              iata: flightInfo.destination,
            },
            date: {
              year: flightInfo.departureDate.year,
              month: flightInfo.departureDate.month,
              day: flightInfo.departureDate.day,
            },
          },
          ...(isRoundTrip
            ? [
              {
                originPlaceId: {
                  iata: flightInfo.destination,
                },
                destinationPlaceId: {
                  iata: flightInfo.origin,
                },
                date: {
                  year: flightInfo.departureDate.year,
                  month: flightInfo.departureDate.month,
                  day: flightInfo.departureDate.day,
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