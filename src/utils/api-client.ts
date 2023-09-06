/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getLocalStorage, removeLocalStorage } from "./local-storage";
import { accessToken } from "./constant";
import { signOut } from "@/lib/cognito";
import sharedObject from "@/api-config";

export const authApiClient = axios.create({
	baseURL: sharedObject.api.ENDPOINT,
	headers: {
		"Content-type": "application/json",
		Authorization: `Bearer ${getLocalStorage(accessToken)}`,
	},
});

authApiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error?.response?.status === 401) {
			signOut();
			removeLocalStorage(accessToken);
			window.location.href = "/login";
		}

		return Promise.reject(error);
	}
);

/* export const unAuthApiClient = axios.create({
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
	},
}); */
