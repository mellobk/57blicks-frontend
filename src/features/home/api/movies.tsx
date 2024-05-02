/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { authApiClient } from "@/utils/api-client";
import {
	createUserMovieUrl,
	getMoviesUrl,
	getUserLoggedMovies,
} from "./backend-api";
import type {
	Movies,
	UserMovieResponse,
	UserMovies,
} from "../types/movies.type";

const getMovies = async (value: string) => {
	const response = await authApiClient.get<Movies>(getMoviesUrl(value));
	return response.data;
};

const createUserMovies = async (body: UserMovies) => {
	const response = await authApiClient.post<UserMovies>(
		createUserMovieUrl(),
		body
	);
	return response.data;
};

const getUserMovies = async () => {
	const response = await authApiClient.get<UserMovieResponse>(
		getUserLoggedMovies()
	);
	return response.data;
};

const ManageMoviesService = {
	getMovies,
	createUserMovies,
	getUserMovies,
};

export default ManageMoviesService;
