import type { Datum } from "@/types/api/datum";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";

export interface Lender {
	data: Array<Datum>;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	isSpecialCase: boolean;
	fundingBreakdowns: Array<FundingBreakdown>;
}

export enum LenderNameType {
	DKC_LENDING_LLC = "DKC Lending LLC",
	DKC_LENDING_FL = "DKC Lending FL",
	DKC_LENDING_IV = "DKC Lending IV",
	DKC_LENDING_LC = "DKC Lending LC",
	DKC_LENDING_V = "DKC Lending V",
	YIELD_SPREAD = "Yield Spread",
	DKC_SERVICING_FEE_INCOME = "DKC Servicing Fee Income",
}
