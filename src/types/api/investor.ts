import type { User } from "@/types/api/user";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";

export interface Investor {
	target?: unknown;
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
	participationBreakdowns?: Array<FundingBreakdown>;
}
