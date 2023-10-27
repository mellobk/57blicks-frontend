import { Loan } from "@/types/api/loan";

export interface FundingBreakdown {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	amount: string;
	rate: string;
	prorated: string;
	regular: string;
	loan: Loan;
}
