import { Lender } from "@/types/api/lender";
import { Loan } from "@/types/api/loan";

export interface FundingBreakdown {
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
}
