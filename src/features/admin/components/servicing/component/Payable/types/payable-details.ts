import type { Payable, PayableStatus, PayableType } from ".";

import type { Investor } from "@/types/api/investor";
import type { LedgerTypeOfPayment } from "../../Ledger/types";
import type { Lender } from "@/types/api/lender";

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

export interface PayableDetailPending {
	id: string;
	name: string;
	type: PayableType;
	selected?: boolean;
}
