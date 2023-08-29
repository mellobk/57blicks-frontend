export type AddAdminFields = {
	firstName: string;
	lastName: string;
	mailingAddress: string;
	email: string;
	phoneNumber: string;
};

export type AddInvestorFields = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	einSsn?: string;
	zip?: string;
	streetAddress?: string;
};

export type AddInvestorBankFields = {
	bankingName: string;
	routingNumber: string;
	accountNumber: string;
	accountType: string;
};
