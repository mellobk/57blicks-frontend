export type RegisterFields = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type ChangePassWordFields = {
	oldPassword: string;
	newPassword: string;
};

export type LoginFields = {
	email: string;
	password: string;
};

export type PasswordValidations = {
	message: string;
	complete: boolean;
};
