import type { Borrower } from "@/types/api/borrower";
import type { Collateral } from "@/types/api/collateral";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { User } from "@/types/api/user";
import type { ParticipationBreakdown } from "@/types/api/paticipation-breakdown.ts";

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
	taxedPaid?: boolean;
	collaterals: Array<Collateral>;
	ltv: string;
	fundingBreakdowns: Array<FundingBreakdown>;
	participationBreakdowns: Array<ParticipationBreakdown>;
	user: User;
}
