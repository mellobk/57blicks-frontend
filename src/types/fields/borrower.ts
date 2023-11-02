import { User } from "@/types/fields/user";

export type Borrower = {
	accountNumber?: string;
	accountType?: string;
	bankingName?: string;
	llc: string;
	routingNumber?: string;
	ssnEin: string;
	user: User;
};
