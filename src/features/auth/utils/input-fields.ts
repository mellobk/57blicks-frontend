import type { CreatePassWordFields, LoginFields } from "../types/validations";

const createPassWordFields: CreatePassWordFields = {
	password: "password",
};

export const loginFields: LoginFields = {
	email: "email",
	password: "password",
};

export default createPassWordFields;