/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Investor } from "@/types/api/investor";
import type { Loan } from "@/types/api/loan.ts";

export interface ParticipationBreakdown {
	id: string;
	constructionHoldback?: number;
	paymentValue?: number;
	holdBackPaymentValue?: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	lenderName: string;
	amount: string;
	rate: string;
	prorated: string;
	regular: string;
	investor: Investor;
	loan: Loan;
	type: "Investor" | "YieldSpread" | "Lender" | "Servicing";
}
