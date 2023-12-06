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
	approvalState?: string;
	createdAt?: Date;
	updatedAt?: Date;
	type?: string;
	totalLoanAmount?: string;
	interestRate?: string;
	originationDate?: Date;
	maturityDate?: Date;
	constructionHoldback?: string;
	amountDrawn?: string;
	prepaymentPenalty?: string;
	status?: string;
	loanConsultant?: string;
	leadSource?: string;
	borrower?: Borrower;
	collaterals?: Array<Collateral>;
	ltv?: string;
	comment?: string;
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

export interface Notification {
	title?: string;
	content?: string;
	timestamp?: Date;
	redirectPath?: string;
	additionalData?: string;
	userFullName?: string;
	priority?: string;
	type?: string;
	status?: string;
	roles?: Array<string>;
}
