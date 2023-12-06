import type { Loan } from "@/types/api/loan";
import type { PayableDetail } from "./payable-details";

export enum PayableStatus {
	PENDING = "Pending",
	PAID = "Paid",
}

export enum PayableType {
	INVESTOR = "Investor",
	LENDER = "Lender",
	SERVICING = "Servicing",
	YIELD_SPREAD = "Yield Spread",
}

export interface Payable {
	id: string;
	date: Date;
	month: Date;
	amount: number;
	amountPaid: number;
	status: PayableStatus;
	payableDetails?: Array<PayableDetail>;
	loan?: Loan;
}
