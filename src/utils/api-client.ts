import type { IErrorResponse } from "@/features/manage-user/types/api.ts";
import { accessToken } from "./constant.ts";
import axios from "axios";
import { getLocalStorage } from "./local-storage.ts";
import sharedObject from "@/config/api-config";
import { signOut } from "@/lib/cognito";
import useStore from "@/stores/app-store.ts";

const store = useStore.getState();

export const authApiClient = axios.create({
	baseURL: sharedObject.api.ENDPOINT,
});

authApiClient.interceptors.request.use(
	(config: any) => {
		config.headers.Authorization = `Bearer  ${getLocalStorage(accessToken)}`;
		config.headers["Content-type"] = "application/json";

		return config;
	},
	(error: any) => {
		return Promise.reject(error);
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
		if (error?.response?.status === 403) {
			window.location.href = "/403";
		}

		const clearErrorMessage = store.clearErrorMessage;
		const setErrorMessage = store.setErrorMessage;

		const errorResponse = error as IErrorResponse;

		setErrorMessage(errorResponse.response.data.message);
		setTimeout(clearErrorMessage, 2000);

		return Promise.reject(error);
	}
);

/* export const unAuthApiClient = axios.create({
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
	},
}); */
