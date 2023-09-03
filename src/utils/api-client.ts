/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getLocalStorage } from "./local-storage";
import { accessToken } from "./constans";

export const authApiClient = axios.create({
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
		Authorization: `Bearer ${getLocalStorage(accessToken)}`,
	},
});

export const unAuthApiClient = axios.create({
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
	},
});

export const formatResponse = (res: any) => {
	return JSON.stringify(res, null, 2);
};
