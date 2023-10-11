import {
	ApprovalStateType,
	LedgerType,
	LedgerTypeOfPayment,
	type Ledgers,
} from "../types";

export const defaultLedgerValues: Ledgers = {
	id: "",
	ledgerDate: new Date(),
	typeOfPayment: LedgerTypeOfPayment.CUSTOM,
	typeOfPaymentDescription: "",
	type: LedgerType.DEBIT,
	memo: "",
	debit: 0,
	credit: 0,
	balance: 0,
	approvalState: ApprovalStateType.PENDING,
	order: 0,
	editable: true,
};
