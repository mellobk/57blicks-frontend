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
	isActive?: boolean;
}

export interface Investor {
	target?: any;
	id: string;
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
