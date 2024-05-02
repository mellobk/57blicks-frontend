/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NetflixLogo from "@/assets/images/svg/netflix-logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type FC } from "react";
import ManageMoviesService from "../../api/movies";
import { CarouselITems } from "@/components/forms/Carousel";
import type { Datum, UserMovies } from "../../types/movies.type";
import { getLocalStorage } from "@/utils/local-storage";
import userStore from "@/stores/user-store";

const Favorites: FC = () => {
	const setUserInfo = userStore((state) => state.setUserInfo);
	const userInfo = userStore((state) => state.userInfo);
	const [allMovies, setAllMovies] = useState<Array<Datum> | undefined>();
	const localUserStorage = JSON.parse(getLocalStorage("user")) as {
		id: string;
	};
	const likeFavorite = useMutation((data: UserMovies) => {
		return ManageMoviesService.createUserMovies(data);
	});

	const userMovieQuery = useQuery(
		["get-all-user-movies"],
		() => {
			return ManageMoviesService.getUserMovies();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		const allFavoritesMovies = () => {
			const data = userInfo.userMovies
				?.filter((data) => data?.favorite)
				.map((data) => data.movie);

			if (data) {
				setAllMovies(data as any);
			}
		};

		allFavoritesMovies();
	}, [userInfo.userMovies]);

	const handleFavorite = (value: any, state: boolean): void => {
		likeFavorite.mutate({
			userId: localUserStorage.id,
			movieId: value.id || "",
			favorite: state,
		});
	};

	const handleDisLike = (value: any): void => {
		likeFavorite.mutate({
			userId: localUserStorage.id,
			movieId: value.id || "",
			disLikes: true,
			likes: false,
		});
	};

	const handleLike = (value: any): void => {
		likeFavorite.mutate({
			userId: localUserStorage.id,
			movieId: value.id || "",
			disLikes: false,
			likes: true,
		});
	};

	useEffect(() => {
		setUserInfo(userMovieQuery?.data || null);
	}, [userMovieQuery.data]);

	const refreshData = () => {
		void userMovieQuery.refetch();
	};

	useEffect(() => {
		if (likeFavorite.isSuccess) {
			refreshData();
			likeFavorite.reset();
		}
	}, [likeFavorite.data]);

	return (
		<div className="flex flex-col items-center  w-full bg-white text-primary p-4 gap-4 mb-4">
			<NetflixLogo />

			<CarouselITems
				movies={allMovies}
				favoriteCallBack={handleFavorite}
				disLikeCallBack={handleDisLike}
				likeCallBack={handleLike}
			/>
		</div>
	);
};

export { Favorites };
