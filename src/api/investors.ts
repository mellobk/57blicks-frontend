import type { Investor } from "@/types/api/investor";
import type { Loan } from "@/types/api/loan";
import { authApiClient } from "@/utils/api-client";

const getInvestors = async (searchValue?: string) => {
	const response = await authApiClient.get<Array<Investor>>(
		`/investors/filter-data/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const getInvestorsWithLoans = async (searchValue?: string) => {
	const response = await authApiClient.get<Array<Loan>>(
		`/investors/loans/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const getInvestorsWithLoansById = async (id?: string) => {
	const response = await authApiClient.get<Array<Loan>>(
		`/investors/loans/${id}`
	);

	return response.data;
};

const InvestorsService = {
	getInvestors,
	getInvestorsWithLoans,
	getInvestorsWithLoansById,
};

export default InvestorsService;
