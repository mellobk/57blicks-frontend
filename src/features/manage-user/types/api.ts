interface Role {
	id: string;
	name: string;
	description: string;
	createdAt: string; // You can also use 'Date' if it's converted to a Date object in your application
	updatedAt: string; // Same note applies here
	createdBy: string | null;
	updatedBy: string | null;
	deletedAt: string | null; // If this represents a date, you can use 'Date' type
}

export interface User {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	firstName?: string;
	lastName?: string;
	email?: string;
	entityName?: string;
	sub?: string;
	phoneNumber?: string;
	mailingAddress?: string;
	company?: string;
	isActive?: boolean;
	companyName?: string;
	role?: Role;
}

export interface Investor {
	target?: any;
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	ssnEin?: string;
	streetAddress?: string;
	zip?: string;
	bankingName?: string;
	routingNumber?: string;
	accountNumber?: string;
	accountType?: string;
	user?: User;
}

export interface IErrorResponse {
	response: {
		data: {
			statusCode: number;
			message: string;
		};
	};
}

export interface Permissions {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
	name: string;
	description: string;
	inviteAdmins: boolean;
	inviteAccounters: boolean;
	inviteInvestors: boolean;
	viewInvestors: boolean;
	viewAdmins: boolean;
	viewAccounts: boolean;
	editAdmins: boolean;
	editInvestors: boolean;
	editAccounting: boolean;
	editBorrowers: boolean;
	disableUsers: boolean;
	approveUsersModifications: boolean;
	grantPermissions: boolean;
	createLoan: boolean;
	viewLoans: boolean;
	inputTransactionsLedger: boolean;
	approveNewLoans: boolean;
	approveLoanChanges: boolean;
	sendInvoice: boolean;
	loanOverview: boolean;
	createOpportunity: boolean;
	viewOpportunities: boolean;
	editOpportunities: boolean;
	sendOpportunities: boolean;
	downloadOpportunities: boolean;
	approveOpportunities: boolean;
	reporting: boolean;
	viewPqrs: boolean;
	editPqrs: boolean;
}
