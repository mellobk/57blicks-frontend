import type { validationSchema } from "../schema";
import type { z } from "zod";

export enum LedgerTypeOfPayment {
	INTEREST = "Interest",
	PRINCIPAL = "Principal",
	LATE_FEE = "Late fee",
	CUSTOM = "Custom",
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
	loan?: string;
};

export type Ledger = z.infer<typeof validationSchema>["ledgers"][number];

//generate math.random number between 1000 and 9999
const radom = Math.floor(Math.random() * 10000) + 1000;

export const exampleLedger: Ledger = {
	id: `18a833d2-c425-4c62-a73a-d6ae14fc${radom}`,
	ledgerDate: "10102023",
	typeOfPayment: LedgerTypeOfPayment.INTEREST,
	typeOfPaymentDescription: "Interest",
	type: LedgerType.DEBIT,
	memo: "memo",
	debit: 100,
	credit: 0,
	balance: 0,
	approvalState: ApprovalStateType.PENDING,
	editable: true,
	order: 0,
	new: true,
};
