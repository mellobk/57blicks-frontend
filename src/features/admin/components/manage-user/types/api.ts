import type { Borrower } from "@/types/fields/borrower";
import type { Collateral } from "@/types/api/collateral";
import type { Lender } from "@/types/api/lender";
import type { Opportunity } from "../../opportunities/types/fields";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Role {
	id: string;
	name: string;
	description: string;
	createdAt: string; // You can also use 'Date' if it's converted to a Date object in your application
	updatedAt: string; // Same note applies here
	createdBy: string | null;
	updatedBy: string | null;
	deletedAt: string | null; // If this represents a date, you can use 'Date' type
}

export interface PermissionGroup {
	id?: string;
	name?: string;
	description?: string;
	createdAt?: string; // You can also use 'Date' if it's converted to a Date object in your application
	updatedAt?: string; // Same note applies here
	createdBy?: string | null;
	updatedBy?: string | null;
	deletedAt?: string | null; // If this represents a date, you can use 'Date' type
	permissionType?: string;
	permissions?: Array<PermissionGroup>;
}

export interface User {
	data?: any;
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
	permission_group_id?: string;
	role?: Role;
	permissionGroup?: any;
	investor?: {
		target?: any;
		id?: string;
		createdAt?: Date;
		updatedAt?: Date;
		ssnEin?: string;
		streetAddress?: string;
		zip?: string;
		accountName?: string;
		bankingName?: string;
		routingNumber?: string;
		accountNumber?: string;
		accountType?: string;
	};
}

export interface Investor {
	accountName?: string;
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
			description?: string;
		};
	};
}

export interface Permissions {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: null;
	name?: string;
}

export interface IGlobalSearch {
	users?: Array<User>;
	collaterals?: Array<Collateral>;
	opportunities?: Array<Opportunity>;
	borrowers?: Array<Borrower>;
	lenders?: Array<Lender>;
}
