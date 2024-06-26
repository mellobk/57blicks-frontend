import type { User } from "@/types/api/user";

export interface Borrower {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	llc: string;
	ssnEin: string;
	accountName: string;
	bankingName: string;
	routingNumber: string;
	accountNumber: string;
	accountType: string;
	user: User;
}
