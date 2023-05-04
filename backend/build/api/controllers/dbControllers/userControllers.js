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
exports.getTripsController = void 0;
const dbUser_1 = require("../../../modules/firebase/controllers/dbUser");
const getTripsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const result = yield (0, dbUser_1.getTrips)(userId);
        return res
            .status(200)
            .header("Content-Type: application/json")
            .json(result);
    }
    catch (error) {
        console.log(error, "GetTripsController Endpoint Error");
        return res
            .status(500)
            .json({ error: "User not found" });
    }
});
exports.getTripsController = getTripsController;
