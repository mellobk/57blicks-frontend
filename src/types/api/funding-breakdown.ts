import type { Lender } from "@/types/api/lender";
import type { Loan } from "@/types/api/loan";

export interface FundingBreakdown {
	participationBreakdowns?: Array<FundingBreakdown>;
	constructionHoldback?: number;
	holdBackPaymentValue?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	investor?: any;
	paymentValue?: number;
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	lenderName: string;
	amount: string;
	rate: string;
	prorated: string;
	regular: string;
	lender: Lender;
	loan: Loan;
	type: "Investor" | "YieldSpread" | "Lender" | "Servicing";
}
