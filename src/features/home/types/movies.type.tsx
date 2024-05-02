export type Datum = {
	favorite?: boolean;
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	title?: string;
	year?: string;
	genres?: string;
	cover?: string;
	likes?: number;
	dis_likes?: number;
};

export type Meta = {
	page?: number;
	take?: number;
	itemCount?: number;
	pageCount?: number;
	hasPreviousPage?: boolean;
	hasNextPage?: boolean;
};

export type UserMovies = {
	userId: string;
	movieId: string;
	favorite?: boolean;
	disLikes?: boolean;
	likes?: boolean;
};

export type Movies = {
	data?: Array<Datum> | undefined;
	meta?: Meta;
};

export type UserMovie = {
	id?: string;
	createdAt?: Date;
	createdBy?: null;
	updatedAt?: Date;
	likes?: boolean;
	disLikes?: boolean;
	favorite?: boolean;
	movie?: Datum;
};

export type UserMovieResponse = {
	id?: string;
	createdAt?: Date;
	createdBy?: null;
	updatedAt?: Date;
	firstName?: string;
	lastName?: string;
	role?: string;
	email?: string;
	phone?: null;
	avatar?: null;
	userMovies?: Array<UserMovie>;
};
