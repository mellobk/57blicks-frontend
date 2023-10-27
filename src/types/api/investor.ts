import { User } from "@/types/api/user";
import { FundingBreakdown } from "@/types/api/funding-breakdown.ts";

export interface Investor {
	target?: any;
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	ssnEin?: string;
	streetAddress?: string;
	zip?: string;
	bankingName?: string;
	routingNumber?: string;
	accountNumber?: string;
	accountType?: string;
	user?: User;
	participationBreakdowns?: FundingBreakdown[];
}
