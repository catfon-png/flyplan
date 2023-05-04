// require("dotenv").config();
import axios from "axios";
import dotenv from "dotenv";

export const autoSuggestSkyscanner = async (search: string) => {
    const options = {
        method: 'POST',
        url: process.env.SKAPI_AUTOSUGGEST,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
            'X-RapidAPI-Host': process.env.X_RapidAPI_Host,
        },
        data: search
    };
    return axios
        .request(options)
        .then(response => {
            return response.data
        })
        .catch(error => console.error(error));
    }
