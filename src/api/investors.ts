import type { Investor } from "@/types/api/investor";
import type { Loan } from "@/types/api/loan";
import { Payable } from "@/features/admin/components/servicing/component/Payable/types";
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

const getPayablesByInvestor = async (year: number): Promise<Array<Payable>> => {
	const response = await authApiClient.get<Array<Payable>>(
		`/investors/payables-by-investor?year=${year}`
	);
	return response.data;
};

const InvestorsService = {
	getInvestors,
	getInvestorsWithLoans,
	getLoansByInvestor,
	getPayablesByInvestor,
};

export default InvestorsService;
