import type {
	AddAdminFields,
	AddInvestorBankFields,
	AddInvestorFields,
} from "../types/fields.ts";

export const addAdminFields: AddAdminFields = {
	firstName: "firstName",
	lastName: "lastName",
	mailingAddress: "mailingAddress",
	email: "email",
	phoneNumber: "phoneNumber",
	entityName: "entityName",
	companyName: "companyName",
};

export const addInvestorFields: AddInvestorFields = {
	firstName: "firstName",
	lastName: "lastName",
	streetAddress: "streetAddress",
	mailingAddress: "mailingAddress",
	email: "email",
	phoneNumber: "phoneNumber",
	einSsn: "einSsn",
	zip: "zip",
	llc: "llc",
	entityName: "entityName",
	companyName: "companyName",
};
export const addInvestorBankFields: AddInvestorBankFields = {
	accountNumber: "accountNumber",
	accountType: "accountType",
	bankingName: "bankingName",
	routingNumber: "routingNumber",
};
