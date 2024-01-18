/* eslint-disable @typescript-eslint/no-explicit-any */
export type FundingBreakdown = {
	loan: any;
	amount: string;
	investorId?: string;
	lenderName: string;
	prorated: string;
	rate: string;
	regular: string;
};
