import type { Ledgers } from "../types";

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

	return "";
};
