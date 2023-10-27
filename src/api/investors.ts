import { Investor } from "@/types/api/investor";
import { authApiClient } from "@/utils/api-client";

const getInvestors = async (searchValue?: string) => {
	const response = await authApiClient.get<Array<Investor>>(
		`/investors/filter-data/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const InvestorsService = {
	getInvestors,
};

export default InvestorsService;
