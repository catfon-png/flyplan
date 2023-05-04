import { Request, Response } from "express";
import { skyscannerApi, skyscannerApiGet } from "../../modules/skyscannerApi/skyscannerApi";
import { autoSuggestFlightRadar } from "../../modules/flightSearchApi/flightSearchFlightRadar";
import fs from "fs";

const skyscannerApiControllerPost = async (req: Request, res: Response) => {
  try {
    const flightInfo = req.body;
    const result = await skyscannerApi(flightInfo);
    return res.status(200).header("Content-Type: application/json").json(result);
  } catch (error) {
    console.log(error, "Skyscanner Api Error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

const skyscannerApiControllerGet = async (req: Request, res: Response) => {
  try {
    const flightInfo = req.body;
    const result = await skyscannerApiGet(flightInfo);
    return res.status(200).header("Content-Type: application/json").json(result);
  } catch (error) {
    console.log(error, "Skyscanner Api Error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

// previous version
const flightRadarController = async (_req: Request, res: Response) => {
  try {
    const result = await autoSuggestFlightRadar();
    return res.status(200).header("Content-Type: application/json").json(result);
  } catch (error) {
    console.log(error, "FlightRadar Api Error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const flightRadarController = async (_req: Request, res: Response) => {
//   const filePath = "./data/iataList.json";
//   try {
//     const json = await fs.readFileSync(filePath, "utf8");
//     const data = JSON.parse(json);
//     return res.status(200).header("Content-Type: application/json").json(data);
//   } catch (error) {
//     console.log(error, "Error reading data from file");
//     throw error;
//   }
// };

export { skyscannerApiControllerPost, skyscannerApiControllerGet, flightRadarController };
