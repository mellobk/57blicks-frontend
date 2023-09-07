/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DkcServicing {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	borrower?: string;
	collateralAddress?: string;
	totalLoan?: string;
	rate?: string;
	sub?: string;
	monthlyPayment?: string;
	originDate?: string;
	maturityDate?: string;
}
