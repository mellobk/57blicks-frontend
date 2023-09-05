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
	einSsn?: string | undefined;
	zip?: string | undefined;
	streetAddress?: string | undefined;
};

export type AddInvestorBankFields = {
	id?: string;
	bankingName: string;
	routingNumber: string;
	accountNumber: string;
	accountType: string;
};
