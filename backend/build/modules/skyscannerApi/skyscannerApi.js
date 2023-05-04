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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skyscannerApi = void 0;
require("dotenv").config();
const axios_1 = __importDefault(require("axios"));
const skyscannerApi = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const optionsPost = {
        method: "POST",
        url: process.env.SKAPI_ASYNC,
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": process.env.X_RapidAPI_Key_BL,
            "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
        },
        data: input,
    };
    return yield axios_1.default
        .request(optionsPost)
        .then(function (response) {
        var _a, _b, _c, _d;
        const data = response.data.content.results;
        const filteredData = {
            itineraries: data.itineraries,
            legs: data.legs,
            carriers: data.carriers,
        };
        const searchList = [];
        for (const key in filteredData.itineraries) {
            const itinerary = filteredData.itineraries[key];
            const flightInfo = {
                itinerary: itinerary.legIds,
                link: ((_b = (_a = itinerary.pricingOptions[0]) === null || _a === void 0 ? void 0 : _a.items[0]) === null || _b === void 0 ? void 0 : _b.deepLink) || "N/A",
                price: ((_d = (_c = itinerary.pricingOptions[0]) === null || _c === void 0 ? void 0 : _c.price) === null || _d === void 0 ? void 0 : _d.amount) || "N/A",
                carriers: [],
                depTime: [],
                arrivalTime: [],
            };
            searchList.push(flightInfo);
        }
        for (const key in filteredData.legs) {
            const leg = filteredData.legs[key];
            for (const flight of searchList) {
                const index = flight.itinerary.indexOf(key);
                if (index !== -1) {
                    const timeConverter = (flightTime) => {
                        const year = flightTime.year;
                        const month = String(flightTime.month).padStart(2, "0");
                        const day = String(flightTime.day).padStart(2, "0");
                        const hour = String(flightTime.hour).padStart(2, "0");
                        const minute = String(flightTime.minute).padStart(2, "0");
                        const newFlightTime = `${day}-${month}-${year}-${hour}:${minute}`;
                        return newFlightTime;
                    };
                    flight.depTime[index] = timeConverter(leg.departureDateTime);
                    flight.arrivalTime[index] = timeConverter(leg.arrivalDateTime);
                    const findingCarrier = leg.operatingCarrierIds.map((carrier) => {
                        for (const key in filteredData.carriers) {
                            const carrier2 = filteredData.carriers[key];
                            if (key === carrier) {
                                if (!carrier2.imageUrl) {
                                    return {
                                        id: carrier,
                                        name: carrier2.name,
                                        logo: carrier2.name,
                                    };
                                }
                                else {
                                    return {
                                        id: carrier,
                                        name: carrier2.name,
                                        logo: carrier2.imageUrl,
                                    };
                                }
                            }
                        }
                        // Add a default return value here
                        return {
                            id: "unknown",
                            name: "Unknown Carrier",
                            logo: "",
                        };
                    });
                    flight.carriers[index] = findingCarrier;
                    // flight.carriers[index] = findingCarrier as never;
                }
            }
        }
        return searchList.sort((a, b) => Number(a.price) - Number(b.price)); // Convert price to number before subtraction
    })
        .catch((error) => {
        console.log(error, 'Skyscanner Api Error');
        throw error;
    });
});
exports.skyscannerApi = skyscannerApi;
