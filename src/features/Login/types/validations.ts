export type CreatePassWordFields = {
	password: string;
};

export type LoginFields = {
	email: string;
	password: string;
};

export type PasswordValidations = {
	message: string;
	complete: boolean;
};
