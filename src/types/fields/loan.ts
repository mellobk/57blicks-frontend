import { Borrower } from "@/types/fields/borrower";
import { Collateral } from "@/types/fields/collateral";
import { FundingBreakdown } from "@/types/fields/funding-breakdown";

export type Loan = {
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
	participationBreakdown?: Array<FundingBreakdown>;
	prepaymentPenalty?: string;
	totalLoanAmount?: string;
	type?: string;
	status?: string;
};
