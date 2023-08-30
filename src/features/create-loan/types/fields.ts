type Collateral = {
	assetType: string;
	collateralAddress: string;
	insuranceExpirationDate: string;
	taxUrl: string;
};

export type FundingBreakdown = {
	amount: string;
	lender: string;
	prorated: string;
	rate: string;
	regular: string;
	type?: "participant";
};

export type LoanFields = {
	amountDrawn: string;
	assetType: string;
	borrowerEmailAddress: string;
	borrowerLlc: string;
	borrowerPhoneNumber: string;
	collaterals: Collateral[];
	collateralAddress: string;
	collateralLink: string;
	constructionHoldback: string;
	einSsn: string;
	firstName: string;
	fundingBreakdown: FundingBreakdown[];
	insuranceExpirationDate: string;
	interestRate: string;
	lastName: string;
	loanType: string;
	mailingAddress: string;
	maturityDate: string;
	originationDate: string;
	prepaymentPenalty: string;
	taxUrl: string;
	totalLoanAmount: string;
};
