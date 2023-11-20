import type { Borrower } from "@/types/fields/borrower";
import type { Collateral } from "@/types/fields/collateral";
import type { FundingBreakdown } from "@/types/fields/funding-breakdown";

export type Loan = {
	id?: string;
	name?: string;
	amountDrawn?: string;
	borrower?: Borrower;
	collaterals?: Array<Collateral>;
	constructionHoldback?: string;
	fundingBreakdown?: Array<FundingBreakdown>;
	interestRate?: string;
	leadSource?: string;
	loanConsultant?: string;
	ltv?: string;
	maturityDate?: string;
	originationDate?: string;
	taxesPaid?: boolean;
	participationBreakdown?: Array<FundingBreakdown>;
	prepaymentPenalty?: string;
	totalLoanAmount?: string;
	type?: string;
	status?: string;
};
