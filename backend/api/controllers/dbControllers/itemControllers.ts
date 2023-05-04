import { Request, Response } from "express";
import { addItemToTrip, deleteItemById } from "../../../modules/firebase/controllers/dbItem";

export const addItemToUserController = async (req: Request, res: Response) => {
  try {
    const { userId, flightItem } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing user ID" });
    }
  
    
    const isReturnTrip = !flightItem.itineraryReturn;
    const itinerary = {
      itineraryIdOneWay: flightItem.itineraryOneWay,
      itineraryIdReturn: isReturnTrip
        ? undefined
        : flightItem.itineraryReturn,
      link: flightItem.link,
      logoOneWay: flightItem.logoOneWay,
      logoOneWayName: flightItem.logoOneWayName,
      logoReturn: isReturnTrip ? undefined : flightItem.logoReturn,
      logoReturnName: isReturnTrip ? undefined : flightItem.logoReturnName,
      origin: {
        fullName: flightItem.cityOrigin,
        cityName: flightItem.origin,
      },
      destination: {
        fullName: flightItem.cityDestination,
        cityName: flightItem.destination,
      },
      durationOneWay: flightItem.durationOneWay,
      durationReturn: isReturnTrip ? undefined : flightItem.durationReturn,
      oneWayDate: flightItem.departureDateOneWay,
      departureTimeOneWay: flightItem.departureTimeOneWay,
      arrivalTimeOneWay: flightItem.arrivalTimeOneWay,
      returnDate: isReturnTrip ? undefined : flightItem.departureDateReturn,
      departureTimeReturn: isReturnTrip
        ? undefined
        : flightItem.departureTimeReturn,
      arrivalTimeReturn: isReturnTrip
        ? undefined
        : flightItem.arrivalTimeReturn,
      priceHistory: [
        {
          timeStamp: new Date().toLocaleString(),
          price: flightItem.price,
        },
      ],
    };

    const { tripUuid } = req.body;

    const result = await addItemToTrip(userId, itinerary, tripUuid);
    res
      .status(200)
      .json(result);
  }
  catch (error) {
    console.log(error, "addItemToUserController Endpoint Error");
    return res
      .status(500)
      .json({ error: "Internal server error" });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const { userId, listName, flightUuid } = req.body;
    const result = await deleteItemById(userId, listName, flightUuid);
    return res.status(204).json(result);
  } catch (error) {
    console.log(error, "DeleteItemController Endpoint Error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

