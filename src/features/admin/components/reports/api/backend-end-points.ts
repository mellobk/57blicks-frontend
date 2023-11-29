export const updateLedger = (id: string): string => {
	return `/ledgers/${id}`;
};

export const defaultInsuranceLoan = (): string => {
	return `/loans/default/insurances`;
};

export const defaultTaxLoan = (): string => {
	return `/loans/default/tax`;
};

export const defaultInterestLoan = (): string => {
	return `/loans/default/interest`;
};

export const allDefaultLoan = (): string => {
	return `/loans/default/all`;
};
