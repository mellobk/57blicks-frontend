export type Borrower = {
	accountNumber?: string;
	accountType?: string;
	bankingName?: string;
	llc: string;
	routingNumber?: string;
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
	amount: string;
  constructionHoldback: string;
  investorId?: string;
  lenderName: string;
  prorated: string;
  rate: string;
  regular: string;
};

export type Loan = {
	amountDrawn: string;
	borrower: Borrower;
	collaterals: Array<Collateral>;
	constructionHoldback: string;
	fundingBreakdown: Array<FundingBreakdown>;
	interestRate: string;
	leadSource: string;
	loanConsultant: string;
	ltv: string;
	maturityDate: string;
	originationDate: string;
	participationBreakdown: Array<FundingBreakdown>;
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
