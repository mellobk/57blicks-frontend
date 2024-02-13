export const updateLedger = (id: string): string => {
	return `/ledgers/${id}`;
};

export const defaultInsuranceLoan = (days: string): string => {
	return `/loans/default/insurances?days=${days}`;
};

export const paidOffLoan = (days: string): string => {
	return `/loans/default/paid-off?days=${days}`;
};

export const newLoansFounded = (days: string): string => {
	return `/loans/default/new-founded?days=${days}`;
};

export const extendedFounded = (days: string): string => {
	return `/loans/default/extended?days=${days}`;
};

export const loanConsult = (): string => {
	return `/loans/default/consultant`;
};

export const loanProduct = (): string => {
	return `/loans/default/product`;
};

export const loanAssets = (): string => {
	return `/loans/default/assets`;
};

export const loanAverage = (): string => {
	return `/loans/default/average`;
};

export const loanPaidAverageDays = (): string => {
	return `/loans/default/days/average`;
};

export const defaultTaxLoan = (): string => {
	return `/loans/default/tax`;
};

export const defaultUnauthorizedLoan = (): string => {
	return `/loans/default/unauthorized`;
};

export const defaultInterestLoan = (): string => {
	return `/loans/default/interest`;
};

export const allDefaultLoan = (): string => {
	return `/loans/default/all`;
};
export const taxesLoan = (): string => {
	return `/loans/default/taxes`;
};

export const allDefaultInterestLoan = (value: string): string => {
	return `/loans/default/loan-ledger?date=${value}`;
};
