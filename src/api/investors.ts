import type { Investor } from "@/types/api/investor";
import type { Loan } from "@/types/api/loan";
import type { Payable } from "@/features/admin/components/servicing/component/Payable/types";
import { authApiClient } from "@/utils/api-client";

const getInvestors = async (searchValue?: string) => {
	const response = await authApiClient.get<Array<Investor>>(
		`/investors/filter-data/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const getInvestorsWithLoans = async (
	searchValue?: string
): Promise<Array<Loan>> => {
	const response = await authApiClient.get<Array<Loan>>(
		`/investors/loans/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const getLoansByInvestor = async (): Promise<Array<Loan>> => {
	const response = await authApiClient.get<Array<Loan>>(
		`/investors/loans-by-investor`
	);
	return response.data;
};

const getPayablesByInvestor = async (
	year: number,
	investorId?: string
): Promise<Array<Payable>> => {
	const response = await authApiClient.get<Array<Payable>>(
		`/investors/payables-by-investor?year=${year}&investorId=${investorId}`
	);
	return response.data;
};

const getPayablesByAdmin = async (
	year: number,
	participationId?: string,
	loanId?: string,
	type?: string
): Promise<Array<Payable>> => {
	const response = await authApiClient.get<Array<Payable>>(
		`/investors/payables-for-admin?year=${year}&participationId=${participationId}&loanId=${loanId}&type=${type}`
	);
	return response.data;
};

const InvestorsService = {
	getInvestors,
	getInvestorsWithLoans,
	getLoansByInvestor,
	getPayablesByInvestor,
	getPayablesByAdmin,
};

export default InvestorsService;
