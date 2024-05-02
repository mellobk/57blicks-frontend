/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@/components/ui/Icon";
import type { Datum } from "@/features/home/types/movies.type";
import userStore from "@/stores/user-store";
import { useEffect, type FC } from "react";

type CarouselITemsProps = {
	movies?: Array<Datum>;
	likeCallBack?: (value: Datum) => any;
	disLikeCallBack?: (value: Datum) => any;
	favoriteCallBack?: (value: Datum, state: boolean) => any;
};

export const CarouselITems: FC<CarouselITemsProps> = ({
	movies,
	likeCallBack,
	disLikeCallBack,
	favoriteCallBack,
}) => {
	const userInfo = userStore((state) => state.userInfo);

	useEffect(() => {}, [userInfo]);
	const LIKE_COLOR = "#ad37b9";
	return (
		<div className="flex flex-wrap gap-6 justify-center">
			{movies?.map((movie) => {
				const findUserMovie = userInfo?.userMovies?.find(
					(data) => data?.movie?.id === movie.id
				);

				return (
					<div key={movie.id} className="relative w-[450px] m-2 relative ">
						<img
							className="w-[450px] object-cover h-[250px] m-1"
							src={movie.cover}
						/>

						<div className="w-[300px] font-extrabold"> {movie.title}</div>
						<div className="absolute right-0 cursor-pointer flex gap-6">
							<div
								onClick={() => {
									likeCallBack && likeCallBack(movie);
								}}
							>
								<Icon
									fillColor={findUserMovie?.likes ? "green" : ""}
									name="like"
									width="25"
									color={findUserMovie?.likes ? LIKE_COLOR : "black"}
								/>
							</div>
							<div
								onClick={() => {
									disLikeCallBack && disLikeCallBack(movie);
								}}
							>
								<Icon
									fillColor={findUserMovie?.disLikes ? "red" : ""}
									name="disLike"
									width="25"
									color={findUserMovie?.disLikes ? LIKE_COLOR : "black"}
								/>
							</div>
							<div
								onClick={() => {
									const favoriteState = !findUserMovie?.favorite;
									favoriteCallBack &&
										// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
										favoriteCallBack(
											movie,
											findUserMovie ? favoriteState : true
										);
								}}
							>
								<Icon
									name="favorite"
									width="25"
									color={findUserMovie?.favorite ? LIKE_COLOR : "black"}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
