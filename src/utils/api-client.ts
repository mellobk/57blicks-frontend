import type { IErrorResponse } from "@/features/admin/components/manage-user/types/api";
import { accessToken } from "./constant";
import axios from "axios";
import { getLocalStorage } from "./local-storage";
import sharedObject from "@/config/api-config";
import { signOut } from "@/lib/cognito";
import useStore from "@/stores/app-store";

const store = useStore.getState();

export const authApiClient = axios.create({
	baseURL: sharedObject.api.ENDPOINT,
});

authApiClient.interceptors.request.use(
	(config: any) => {
		config.headers.Authorization = `Bearer ${getLocalStorage(accessToken)}`;

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
