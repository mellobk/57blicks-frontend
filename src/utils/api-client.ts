/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocalStorage, removeLocalStorage } from "./local-storage";
import { accessToken } from "./constant";
import { signOut } from "@/lib/cognito";

export const authApiClient = {
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
		Authorization: `Bearer ${getLocalStorage(accessToken)}`,
	},
};

// Function to make a GET request using the Fetch API
export const fetchData = async (url: string, method: string, body?: any) => {
	const urlData = `${authApiClient.baseURL}${url}`;
	const options = {
		method: method,
		headers: {
			...authApiClient.headers,
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(urlData, options);

	if (response.status === 401) {
		signOut();
		removeLocalStorage(accessToken);
		window.location.href = "/login";
	}

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	return method === "GET" ? response.json() : response;
};
/* export const unAuthApiClient = axios.create({
	baseURL: import.meta.env["VITE_URL_ENVIRONMENT"],
	headers: {
		"Content-type": "application/json",
	},
}); */
