import type {
	AddAdminFields,
	AddInvestorBankFields,
	AddInvestorFields,
} from "../types/validations";

export const addAdminFields: AddAdminFields = {
	firstName: "firstName",
	lastName: "lastName",
	mailingAddress: "mailingAddress",
	email: "email",
	phoneNumber: "phoneNumber",
};

export const addInvestorFields: AddInvestorFields = {
	firstName: "firstName",
	lastName: "lastName",
	streetAddress: "streetAddress",
	email: "email",
	phoneNumber: "phoneNumber",
	einSsn: "einSsn",
	zip: "zip",
};
export const addInvestorBankFields: AddInvestorBankFields = {
	accountNumber: "accountNumber",
	accountType: "accountType",
	bankingName: "bankingName",
	routingNumber: "routingNumber",
};
