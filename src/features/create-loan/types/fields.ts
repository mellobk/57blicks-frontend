export type Collateral = {
	assetType: string;
	collateralAddress: string;
	insuranceExpirationDate: string;
	taxUrl: string;
};

export type FundingBreakdown = {
	amount: number;
	lender: string;
  lenderId?: string;
	rate: number;
	type?: "lender" | "participant";
};

export type Loan = {
	accountNumber?: string;
	accountType?: string;
	amountDrawn: string;
	assetType: string;
	bankingName?: string;
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
	routingNumber?: string;
	taxUrl: string;
	totalLoanAmount: string;
};
