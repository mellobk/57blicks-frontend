import type { Investor } from "@/types/api/investor";
import type { LedgerTypeOfPayment } from "../../Ledger/types";
import type { Lender } from "@/types/api/lender";

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
}

export interface PayableDetail {
	id: string;
	payable: Payable;
	investor?: Investor;
	lender?: Lender;
	type: PayableType;
	memo: string;
	amount: number;
	debit: number;
	credit: number;
	typeOfPayment: LedgerTypeOfPayment;
	status: PayableStatus;
	order: number;
	yieldSpread?: number;
	yieldSpreadRate?: number;
	datePaid?: Date;
}
