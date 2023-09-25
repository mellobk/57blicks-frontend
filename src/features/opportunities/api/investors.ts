import { Investor } from "@/features/opportunities/types/api";
import { authApiClient } from "@/utils/api-client";

const getInvestors = async (searchValue: string) => {
	const response = await authApiClient.get<Array<Investor>>(
		`/investors/filter-data/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const OpportunitiesService = {
	getInvestors,
};

export default OpportunitiesService;
