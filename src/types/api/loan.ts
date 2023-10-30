import { Borrower } from "@/types/api/borrower";
import { Collateral } from "@/types/api/collateral";
import { FundingBreakdown } from "@/types/api/funding-breakdown.ts";
import { User } from "@/types/api/user.ts";

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
	loanConsultant: string;
	leadSource: string;
	borrower?: Borrower;
	collaterals: Collateral[];
	ltv: string;
	participationBreakdowns: FundingBreakdown[];
	user: User;
}
