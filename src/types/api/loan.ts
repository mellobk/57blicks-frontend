/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Borrower } from "@/types/api/borrower";
import type { Collateral } from "@/types/api/collateral";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Lenders } from "@/features/admin/components/investor-portals/types/api";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import type { User } from "@/types/api/user";

//TODO: Fix all types in front and backend
export interface Loan {
	endDate: any;
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
	payables?: Array<{
		[x: string]: any;
		payableDetails: Array<any>;
	}>;
	fundingBreakdowns: Array<FundingBreakdown>;
	fundingBreakDowns: Array<FundingBreakdown>;
	participationBreakdowns: Array<ParticipationBreakdown>;
	lender?: Lenders;
	user: User;
	prorated?: string;
	regular?: string;
	current?: string;
	principal?: string;
	balance?: string;
	end_date?: string;
}
