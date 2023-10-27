import { Borrower } from "@/types/api/borrower";
import { Collateral } from "@/types/api/collateral";

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
	collaterals: Array<Collateral>;
	ltv: string;
  participationBreakdowns: any;
}
