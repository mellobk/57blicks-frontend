/* eslint-disable @typescript-eslint/no-explicit-any */
import ManageMoviesService from "@/features/home/api/movies";
import userStore from "@/stores/user-store";
import { emptyObject } from "@/utils/common-functions";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function userMoviesHook(): void {
	// State and setters for debounced value
	const setUserInfo = userStore((state) => state.setUserInfo);
	const userInfo = userStore((state) => state.userInfo);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const userMovieQuery = useQuery(
		["get-all-user-movies"],
		() => {
			return ManageMoviesService.getUserMovies();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (emptyObject(userInfo)) {
			setUserInfo(userMovieQuery?.data || null);
		}
	}, [userMovieQuery?.data, setUserInfo]);
}
