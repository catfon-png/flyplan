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
exports.autoSuggestFlightRadar = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const autoSuggestFlightRadar = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: "GET",
        url: process.env.URLFlightRadar,
        headers: {
            "X-RapidAPI-Key": process.env.X_RapidAPI_Key_BL,
            "X-RapidAPI-Host": process.env.FlightRadar_RapidAPI_Host,
        },
    };
    return (axios_1.default
        .request(options)
        .then((response) => response.data.rows)
        .then((response) => {
        const data = response.map((item) => ({
            value: item.iata,
            label: `${item.city}, ${item.country}, ${item.name} (${item.iata})`,
        }));
        return data;
    })
        .catch((error) => {
        console.log(error, 'FlightRadar Api Error');
        throw error;
    }));
});
exports.autoSuggestFlightRadar = autoSuggestFlightRadar;
