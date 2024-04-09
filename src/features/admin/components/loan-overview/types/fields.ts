/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LenderNameType } from "@/types/api/lender";

export type DueToDrawDetails = {
	amountOwed: number;
	lender: LenderNameType;
	loanName: string;
	loanAddress: string;
	servicing: number;
	yieldSpread: any;
	yieldSpreadInfo: Array<{
		yieldSpreadInfo: any;
		ys: string;
		total: string;
	}>;
};

export interface IPrincipleOverview {
	totalLoans: number;
	loansDrawnDown: number;
	dueToDraws: number;
	checkAndBalance: number;
}

export interface IInterestOverview {
	totalCollectibles: number;
	totalParticipantsPayable: number;
	servicingFee: number;
	yieldSpread: any;
	checkAndBalance: number;
}

export interface IParticipantOverview {
	id: string;
	name: LenderNameType;
	totalLoans: number;
	totalDrawnToDate: number;
	trustUnallocated: number;
	trustAllocated: number;
	dueToDraws: number;
	totalFunds: number;
	children: Array<IParticipantOverview>;
}

export interface IConstructionHoldbackOverview {
	amountOwed: number;
	lender: LenderNameType;
	loanName: string;
	loanAddress: string;
}

export interface ILoanOverview {
	loanServicingOverview: Array<DueToDrawDetails>;
	principleOverview: IPrincipleOverview;
	trustAccountBalance: number;
	interestOverview: IInterestOverview;
	overviewByInvestors: Array<IParticipantOverview>;
	constructionHoldbackOverview: Array<IConstructionHoldbackOverview>;
}

export interface UpdateParticipationBreakdownDto {
	trustUnallocated: number;
}
