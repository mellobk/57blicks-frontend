export const getMoviesUrl = (value: string): string => {
	return `/movies?take=${value}`;
};

export const createUserMovieUrl = (): string => {
	return `/user-movies/create-user-movie`;
};

export const getUserLoggedMovies = (): string => {
	return `/users/my-movies`;
};
