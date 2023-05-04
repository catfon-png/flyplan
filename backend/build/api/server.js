"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const externalApiControllers_1 = require("./controllers/externalApiControllers");
const userControllers_1 = require("./controllers/dbControllers/userControllers");
const itemControllers_1 = require("./controllers/dbControllers/itemControllers");
const tripControllers_1 = require("./controllers/dbControllers/tripControllers");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(bodyParser.json());
// external Apis Controllers
app.post("/api/flights", externalApiControllers_1.skyscannerApiController);
app.get("/api/search", externalApiControllers_1.flightRadarController);
// DB user Controllers
app.post("/api/flight/user/", userControllers_1.getTripsController);
// DB Item/Flight Controllers
app.post("/api/flight/saveflight", itemControllers_1.addItemToUserController);
app.delete("/api/flight/deleteflight", itemControllers_1.deleteItemController);
// DB Trip Controllers
app.post("/api/trip/addtrip", tripControllers_1.addTripToUserController);
app.delete("/api/trip/deletetrip", tripControllers_1.deleteTripController);
app.listen(5500, () => console.log(`running on port 5500`));
