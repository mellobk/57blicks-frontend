export type AddAdminFields = {
	id?: string;
	firstName: string;
	lastName: string;
	mailingAddress: string;
	email: string;
	phoneNumber: string;
	entityName?: string;
	companyName?: string;
};

export type updateGeneralUserInformation = {
	id?: string;
	email: string;
	phoneNumber: string;
	companyName?: string;
	firstName?: string;
	lastName?: string;
	mailingAddress?: string;
};

export type AddAccountingFields = {
	id?: string;
	firstName?: string;
	lastName?: string;
	mailingAddress?: string;
	email?: string;
	phoneNumber?: string;
	companyName?: string;
};

export type AddInvestorFields = {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	mailingAddress: string;
	einSsn?: string;
	zip?: string;
	streetAddress?: string;
	llc?: string;
	entityName?: string;
	companyName?: string;
};

export type AddInvestorBankFields = {
	id?: string;
	accountName: string;
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
	accountName: string;
	accountNumber: string;
	routingNumber: string;
	accountType: string;
	bankingName: string;
	user: AddAdminFields;
};
