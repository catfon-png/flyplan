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
exports.deleteItemController = exports.addItemToUserController = void 0;
const dbItem_1 = require("../../../modules/firebase/controllers/dbItem");
const dbTrip_1 = require("../../../modules/firebase/controllers/dbTrip");
const addItemToUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            logoReturn: isReturnTrip ? undefined : flightItem.logoReturn,
            origin: {
                cityName: flightItem.origin,
            },
            destination: {
                cityName: flightItem.destination,
            },
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
        const result = yield (0, dbTrip_1.addTripToUser)(userId, itinerary, tripUuid);
        return res
            .status(200)
            .json(result);
    }
    catch (error) {
        console.log(error, "addItemToUserController Endpoint Error");
        return res
            .status(500)
            .json({ error: "Internal server error" });
    }
});
exports.addItemToUserController = addItemToUserController;
const deleteItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, listName, flightUuid } = req.body;
        const result = yield (0, dbItem_1.deleteItemById)(userId, listName, flightUuid);
        return res.status(204).json(result);
    }
    catch (error) {
        console.log(error, "DeleteItemController Endpoint Error");
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteItemController = deleteItemController;
