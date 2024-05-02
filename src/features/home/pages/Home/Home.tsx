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

import { Select } from "@/components/forms/Select";
import { getLocalStorage } from "@/utils/local-storage";
import userStore from "@/stores/user-store";

const Home: FC = () => {
	const setUserInfo = userStore((state) => state.setUserInfo);
	const selectedOption = userStore((state) => state.selectOption);
	const takenItems = Number.parseInt(selectedOption) * 5;

	const setSelectedOption = userStore((state) => state.setSelectedOption);
	const [allMovies, setAllMovies] = useState<Array<Datum> | undefined>();
	const [itemTaken, setItemTaken] = useState(takenItems.toString());
	const [options, setOptions] =
		useState<Array<{ name: string; code: string }>>();
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

	const movieQuery = useQuery(
		["get-all-movies"],
		() => {
			return ManageMoviesService.getMovies(itemTaken);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const calculateOptions = (itemsCount: number) => {
		const count = itemsCount / 5;
		const optionsCalculate = [];

		for (let index = 1; index <= count; index++) {
			const stringIndex = index.toString();
			optionsCalculate.push({ name: stringIndex, code: stringIndex });
		}
		setOptions(optionsCalculate);
	};

	useEffect(() => {
		setAllMovies(movieQuery?.data?.data);
		calculateOptions(movieQuery?.data?.meta?.itemCount || 0);
	}, [movieQuery.data]);

	useEffect(() => {
		void movieQuery.refetch();
	}, [itemTaken]);

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
		<div
			className={`flex flex-col items-center  w-full bg-white text-primary p-4 gap-4 mb-4
			`}
		>
			<NetflixLogo />

			<CarouselITems
				movies={allMovies}
				favoriteCallBack={handleFavorite}
				disLikeCallBack={handleDisLike}
				likeCallBack={handleLike}
			/>
			<Select
				label=""
				className="mt-4"
				value={selectedOption}
				options={options}
				onChange={(value): void => {
					setItemTaken((value.target.value * 5).toString());
					setSelectedOption(value.target.value);
				}}
			/>
		</div>
	);
};

export { Home };
