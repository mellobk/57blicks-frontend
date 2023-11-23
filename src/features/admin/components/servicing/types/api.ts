export interface DkcServicing {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	borrower?: string;
	collateralAddress?: string;
	totalLoan?: string;
	rate?: string;
	sub?: string;
	monthlyPayment?: string;
	originDate?: string;
	maturityDate?: string;
}

export interface Datum {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	isSpecialCase: boolean;
}

export interface Meta {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export interface User {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	lastName: string;
	email: string;
	entityName: string;
	sub: string;
	phoneNumber: string;
	mailingAddress: string;
	isActive: boolean;
}

export interface Borrower {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	llc: string;
	ssnEin: string;
	bankingName: string;
	routingNumber: string;
	accountNumber: string;
	accountType: string;
	user: User;
}

export interface Collateral {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	address: string;
	taxUrl: string;
	insuranceExpirationDate: Date;
	link: string;
	assetType: string;
	isActive: boolean;
}

export interface Loan {
	id?: string;
	createdAt?: Date;
	updatedAt: Date;
	type: string;
	totalLoanAmount: string;
	interestRate: string;
	originationDate: Date;
	maturityDate: Date;
	constructionHoldback: string;
	amountDrawn: string;
	prepaymentPenalty: string;
	status: string;
	taxesPaid: boolean;
	loanConsultant: string;
	leadSource: string;
	borrower?: Borrower;
	collaterals: Array<Collateral>;
	ltv: string;
	defaultType: string;
}

export interface FundingBreakdown {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	amount: string;
	rate: string;
	prorated: string;
	regular: string;
	loan: Loan;
	type: "Investor" | "YieldSpread" | "Lender" | "Servicing";
}

export interface DkcLenders {
	data?: Array<Datum>;
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	name?: string;
	isSpecialCase?: boolean;
	fundingBreakdowns?: Array<FundingBreakdown>;
}

export interface IBorrowerInformation {
	id?: string;
	ssnEin?: string;
	zip?: string;
	llc?: string;
	streetAddress?: string;
	accountNumber?: string;
	routingNumber?: string;
	accountType?: string;
	bankingName?: string;
	firstName?: string;
	lastName?: string;
	mailingAddress?: string;
	email?: string;
	phoneNumber?: string;
	entityName?: string;
	companyName?: string;
}
