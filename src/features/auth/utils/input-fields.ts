import type {
	ChangePassWordFields,
	RegisterFields,
	LoginFields,
} from "../types/validations";

const registerFields: RegisterFields = {
	firstName: "firstName",
	lastName: "lastName",
	email: "email",
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

export default registerFields;
