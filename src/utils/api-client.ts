/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { accessToken } from "./constant.ts";
import axios from "axios";
import { getLocalStorage } from "./local-storage.ts";
import sharedObject from "@/config/api-config";
import { signOut } from "@/lib/cognito";

export const authApiClient = axios.create({
	baseURL: sharedObject.api.ENDPOINT,
});

authApiClient.interceptors.request.use(
	(config: any) => {
		config.headers.Authorization = `Bearer  ${getLocalStorage(accessToken)}`;
		config.headers["Content-type"] = "application/json";

		return config;
	},
	(err: any) => {
		return Promise.reject(err);
	}
);

authApiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error?.response?.status === 401) {
			signOut();
			localStorage.clear();
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
