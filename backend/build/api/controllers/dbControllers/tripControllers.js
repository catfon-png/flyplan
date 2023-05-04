"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTripController = exports.addTripToUserController = void 0;
const dbTrip_1 = require("../../../modules/firebase/controllers/dbTrip");
const addTripToUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, listName } = req.body;
        if (!userId || !listName) {
            return res
                .status(400)
                .json({ message: "Missing user ID or trip name" });
        }
        // Adding an empty itinerary to create the list
        yield (0, dbTrip_1.createNewList)(userId, listName);
        return res
            .status(201)
            .json({ message: "Trip created successfully" });
    }
    catch (error) {
        console.error(error, "Error creating new trip:");
        return res
            .status(500)
            .json({ message: "Internal server error while creating new trip" });
    }
});
exports.addTripToUserController = addTripToUserController;
const deleteTripController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, tripId } = req.body;
        if (!userId || !tripId) {
            return res
                .status(400)
                .json({ message: "Missing user ID or trip name" });
        }
        // Adding an empty itinerary to create the trip
        yield (0, dbTrip_1.deleteTrip)(userId, tripId);
        return res
            .status(204).json("deleted");
    }
    catch (error) {
        console.error(error, "Error deleting trip:");
        return res
            .status(500)
            .json({ message: "Internal server error while deleting trip" });
    }
});
exports.deleteTripController = deleteTripController;
