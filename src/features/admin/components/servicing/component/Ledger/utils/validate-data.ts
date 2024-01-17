import { LedgerTypeOfPayment, type Ledgers } from "../types";
const validateInterest = (ledgers: Array<Ledgers>): string => {
	let error = "";
	ledgers.forEach((ledger) => {
		if (ledger.action === "add" || ledger.action === "edit") {
			//validate user can not create interest credit
			if (
				ledger.typeOfPayment === LedgerTypeOfPayment.INTEREST &&
				(ledger.credit ?? 0) > 0
			) {
				error = "You can not create interest credit";
			}

			if (
				ledger.typeOfPayment === LedgerTypeOfPayment.LATE_FEE &&
				(ledger.credit ?? 0) > 0
			) {
				error = "You can not create late fee credit";
			}
		}
	});

	return error;
};

export const validateDataLedger = (ledgers: Array<Ledgers>): string => {
	if (ledgers === null || ledgers === undefined) {
		return "You need to add a row";
	}

	if (ledgers.length === 0) {
		return "You need to add a row";
	}
	let totalAdd = 0;
	let add = 0;
	let error = "";
	ledgers.forEach((ledger) => {
		totalAdd += 1;
		if (ledger.action === "add" || ledger.action === "edit") {
			add += 1;
			const { debit, credit } = ledger;
			if (debit === 0 && credit === 0) {
				error = `In the row ${totalAdd} you added, you need to add a debit or credit value`;
			}
		}
	});

	if (add === 0) {
		return "You need to add a row";
	}
	if (error !== "") {
		return error;
	}

	if (totalAdd === 0) {
		return "You need to add a row";
	}

	const validate = validateInterest(ledgers);

	if (validate !== "") {
		return validate;
	}

	return "";
};
