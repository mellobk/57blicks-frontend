export type DueToDrawDetails = {
	amountOwed: number;
	lender: string;
	loanName: string;
	loanAddress: string;
};

export type Participant = {
	dueToDraws: number;
	lender: string;
	totalDrawn: number;
	totalFunds: number;
	totalLoan: number;
	trustUnallocated: number;
	trustAllocated: number;
};

export type FundingBreakdown = {
	dueToDraws: number;
	lender: string;
	participants?: Participant[];
	totalDrawn: number;
	totalFunds: number;
	totalLoan: number;
	trustUnallocated: number;
	trustAllocated: number;
};

export type LoanOverviewFields = {
	checkAndBalanceInterest: number;
	checkAndBalancePrinciple: number;
	dueToDrawDetails: DueToDrawDetails[];
	dueToDraws: number;
	fundingBreakdown: FundingBreakdown[];
	loansDrawnDown: number;
	servicingFee: number;
	totalCollectibles: number;
	totalLoans: number;
	totalParticipantsPayable: number;
	trustAccountBalance: number;
	yieldSpread: number;
};
