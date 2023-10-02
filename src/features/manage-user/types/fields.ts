export type AddAdminFields = {
	id?: string;
	firstName: string;
	lastName: string;
	mailingAddress: string;
	email: string;
	phoneNumber: string;
};

export type AddAccountingFields = {
	id?: string;
	firstName: string;
	lastName: string;
	mailingAddress: string;
	email: string;
	phoneNumber: string;
	company: string;
};

export type AddInvestorFields = {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	einSsn?: string;
	zip?: string;
	streetAddress?: string;
};

export type AddInvestorBankFields = {
	id?: string;
	bankingName: string;
	routingNumber: string;
	accountNumber: string;
	accountType: string;
};

export type InvestorFields = {
	id?: string;
	ssnEin: string;
	zip: string;
	streetAddress: string;
	accountNumber: string;
	routingNumber: string;
	accountType: string;
	bankingName: string;
	user: AddAdminFields;
};
