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
exports.flightRadarController = exports.skyscannerApiController = void 0;
const skyscannerApi_1 = require("../../modules/skyscannerApi/skyscannerApi");
const flightSearchFlightRadar_1 = require("../../modules/flightSearchApi/flightSearchFlightRadar");
const skyscannerApiController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flightInfo = req.body;
        const result = yield (0, skyscannerApi_1.skyscannerApi)(flightInfo);
        return res.status(200).header("Content-Type: application/json").json(result);
    }
    catch (error) {
        console.log(error, "Skyscanner Api Error");
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.skyscannerApiController = skyscannerApiController;
const flightRadarController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, flightSearchFlightRadar_1.autoSuggestFlightRadar)();
        return res.status(200).header("Content-Type: application/json").json(result);
    }
    catch (error) {
        console.log(error, "FlightRadar Api Error");
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.flightRadarController = flightRadarController;
