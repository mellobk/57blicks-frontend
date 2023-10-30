import type {
	ChangePassWordFields,
	CreatePassWordFields,
	LoginFields,
} from "../types/validations.ts";

const createPassWordFields: CreatePassWordFields = {
	password: "password",
};

export const loginFields: LoginFields = {
	email: "email",
	password: "password",
};

export const changePassWordFields: ChangePassWordFields = {
	oldPassword: "oldPassword",
	newPassword: "newPassword",
};

export default createPassWordFields;
