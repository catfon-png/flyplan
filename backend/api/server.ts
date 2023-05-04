import express from "express";
import cors from "cors";
import { skyscannerApiControllerPost, flightRadarController, skyscannerApiControllerGet } from "./controllers/externalApiControllers";
import { getTripsController } from "./controllers/dbControllers/userControllers";
import { addItemToUserController, deleteItemController } from "./controllers/dbControllers/itemControllers";
import { addTripToUserController, deleteTripController, changeTripNameController } from "./controllers/dbControllers/tripControllers";

require("dotenv").config();

const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// external Apis Controllers
app.post("/api/flights", skyscannerApiControllerPost);
app.post("/api/flights/get", skyscannerApiControllerGet);
app.get("/api/search", flightRadarController);

// DB user Controllers
app.post("/api/flight/user/", getTripsController);

// DB Item/Flight Controllers
app.patch("/api/flight/saveflight", addItemToUserController);
app.delete("/api/flight/deleteflight", deleteItemController);

// DB Trip Controllers
app.post("/api/trip/addtrip", addTripToUserController);
app.delete("/api/trip/deletetrip", deleteTripController);
app.patch("/api/trip/changeTripName", changeTripNameController);

app.listen(5500, () =>
  console.log(`running on port 5500`)
);
