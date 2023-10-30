import type { Ledgers } from "../types";

interface ICalculateBalance {
	ledgers: Array<Ledgers>;
	balance: number;
	debits: number;
	credits: number;
}

export const calculateBalance = (
	ledgers: Array<Ledgers>
): ICalculateBalance => {
	let balance = 0;
	let debits = 0;
	let credits = 0;
	ledgers.forEach((ledger, index) => {
		const debit = Number.parseFloat(ledger.debit as unknown as string) || 0;
		const credit = Number.parseFloat(ledger.credit as unknown as string) || 0;
		debits += debit;
		credits += credit;
		if (index === 0) {
			balance = credit - debit;
			ledger.balance = balance;
		} else {
			ledger.balance = balance + credit - debit;
		}
		balance = ledger.balance;
	});
	return { ledgers, balance, debits, credits };
};
