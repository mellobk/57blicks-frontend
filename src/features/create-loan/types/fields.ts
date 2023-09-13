export type Borrower = {
	accountNumber: string;
	accountType: string;
	bankingName: string;
	llc: string;
	routingNumber: string;
	ssnEin: string;
	user: User;
};

export type Collateral = {
  address: string;
  assetType: string;
	insuranceExpirationDate: string;
	link: string;
	taxUrl: string;
};

export type FundingBreakdown = {
	amount: number;
	lender: string;
	lenderId?: string;
	rate: number;
	type?: "lender" | "participant";
};

export type LoanFields = {
	amountDrawn: string;
	borrower: Borrower;
	collaterals: Collateral[];
	constructionHoldback: string;
	fundingBreakdown: FundingBreakdown[];
	interestRate: string;
	maturityDate: string;
	originationDate: string;
	prepaymentPenalty: string;
	totalLoanAmount: string;
	type: string;
};

export type User = {
	email: string;
	firstName: string;
	lastName: string;
	mailingAddress: string;
	phoneNumber: string;
};
