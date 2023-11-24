import type { validationSchema } from "../schema";
import type { z } from "zod";

export enum LedgerTypeOfPayment {
	INTEREST = "Interest",
	PRINCIPAL = "Principal",
	LATE_FEE = "Late fee",
	CUSTOM = "Custom",
	DUE_TO_DRAW = "Due to draw",
}

export enum LedgerType {
	DEBIT = "Debit",
	CREDIT = "Credit",
}

export enum ApprovalStateType {
	PENDING = "Pending",
	REJECTED = "Rejected",
	APPROVED = "Approved",
}

export type Ledgers = {
	id?: string;
	ledgerDate?: string | Date;
	typeOfPayment?: LedgerTypeOfPayment;
	typeOfPaymentDescription?: string;
	type?: LedgerType;
	memo?: string;
	debit?: number;
	credit?: number;
	balance?: number;
	approvalState?: ApprovalStateType;
	editable?: boolean;
	new?: boolean;
	order?: number;
	action?: string;
};

export type LedgerFormValues = {
	ledgers: Array<Ledgers>;
	loanId?: string;
};

export type Ledger = z.infer<typeof validationSchema>["ledgers"][number];

//generate math.random number between 1000 and 9999
const radom = Math.floor(Math.random() * 10000) + 1000;

export const exampleLedger: Ledger = {
	id: `18a833d2-c425-4c62-a73a-d6ae14fc${radom}`,
	ledgerDate: "10102023",
	typeOfPayment: LedgerTypeOfPayment.PRINCIPAL,
	typeOfPaymentDescription: "Principal payment",
	type: LedgerType.DEBIT,
	memo: "principal test",
	debit: 5000,
	credit: 0,
	balance: 5000,
	approvalState: ApprovalStateType.PENDING,
	editable: true,
	order: 0,
	new: true,
	action: "add",
};
