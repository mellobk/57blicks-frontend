import { Investor } from "@/types/api/investor";
import { Loan } from "@/types/api/loan.ts";

export interface ParticipationBreakdown {
	id: string;
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
}
