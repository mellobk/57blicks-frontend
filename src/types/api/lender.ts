import { Datum } from "@/types/api/datum";
import { FundingBreakdown } from "@/types/api/funding-breakdown";

export interface Lender {
	data: Array<Datum>;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	isSpecialCase: boolean;
	fundingBreakdowns: Array<FundingBreakdown>;
}
