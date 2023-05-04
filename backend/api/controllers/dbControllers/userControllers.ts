import { Request, Response } from "express";
import { getTrips } from "../../../modules/firebase/controllers/dbUser";

const getTripsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await getTrips(userId);
    return res
      .status(200)
      .header("Content-Type: application/json")
      .json(result);
  } catch (error) {
    console.log(error, "GetTripsController Endpoint Error");
    return res
      .status(500)
      .json({ error: "User not found" });
  }
};

export { getTripsController }
