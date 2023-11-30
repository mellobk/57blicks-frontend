// Keep
export type DueToDrawDetails = {
	amountOwed: number;
	lender: string;
	loanName: string;
	loanAddress: string;
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
	yieldSpread: number;
	checkAndBalance: number;
}

export interface IInvestorOverview {
	name: string;
	totalLoan: number;
	totalDrawnToDate: number;
	trustUnallocated: number;
	trustAllocated: number;
	dueToDraws: number;
	totalFunds: number;
	participants?: Array<IInvestorOverview>;
}

export interface ILoanOverview {
	principleOverview: IPrincipleOverview;
	trustAccountBalance: number;
	interestOverview: IInterestOverview;
	overviewByInvestors: Array<IInvestorOverview>;
}
