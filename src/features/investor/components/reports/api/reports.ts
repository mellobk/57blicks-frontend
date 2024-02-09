/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { investorsReport } from "./backend-end-points";

import { authApiClient } from "@/utils/api-client";

const getInvestorsReportLoan = async (id: string) => {
	const response = await authApiClient.get<{
		loans: any;
		numbersOfLoans: number;
		averageLoanAmount: number;
		rollRate: number;
		interestData: any;
		loanAsset: any;
		loanProduct: any;
		investment: {
			totalInvestment: number;
			myInvestment: number;
			percentage: number;
		};
	}>(investorsReport(id));
	return response.data;
};

const ManageInvestorReportsService = {
	getInvestorsReportLoan,
};

export default ManageInvestorReportsService;
