import { Request, Response } from "express";
import { createNewList, deleteTrip, changeTripName } from "../../../modules/firebase/controllers/dbTrip";


export const addTripToUserController = async (req: Request, res: Response) => {
  try {
    const { userId, listName } = req.body;

    if (!userId || !listName) {
      return res
        .status(400)
        .json({ message: "Missing user ID or trip name" });
    }

    // Adding an empty itinerary to create the list
    await createNewList(userId, listName);

    return res
      .status(201)
      .json({ message: "Trip created successfully" });
  } catch (error) {
    console.error(error, "Error creating new trip:");
    return res
      .status(500)
      .json({ message: "Internal server error while creating new trip" });
  }
};

export const deleteTripController = async (req: Request, res: Response) => {
  try {
    const { userId, tripId } = req.body;

    if (!userId || !tripId) {
      return res
        .status(400)
        .json({ message: "Missing user ID or trip name" });
    }

    // Adding an empty itinerary to create the trip
    await deleteTrip(userId, tripId);

    return res
      .status(204).json("deleted");
  } catch (error) {
    console.error(error, "Error deleting trip:");
    return res
      .status(500)
      .json({ message: "Internal server error while deleting trip" });
  }
};
export const changeTripNameController = async (req: Request, res: Response) => {
  try {
    const { userId, newName, tripId } = req.body;
    // console.log(newName);
    if (!userId || !tripId) {
      return res
        .status(400)
        .json({ message: "Missing user ID or trip name" });
    }

    // Adding an empty itinerary to create the trip
    await changeTripName(newName, tripId,userId);

    return res
      .status(200).json("changed name");
  } catch (error) {
    console.error(error, "Error deleting trip:");
    return res
      .status(500)
      .json({ message: "Internal server error while deleting trip" });
  }
};

