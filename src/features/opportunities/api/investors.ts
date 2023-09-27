import { Investor } from "@/features/opportunities/types/api";
import {Opportunity} from "@/features/opportunities/types/fields";
import { authApiClient } from "@/utils/api-client";

const createOpportunity = async (body: Opportunity) => {
  const response = await authApiClient.post<Array<Opportunity>>("/opportunities", body);

  return response.data;
};

const getInvestors = async (searchValue: string) => {
	const response = await authApiClient.get<Array<Investor>>(
		`/investors/filter-data/?canShowDisable=false${
			searchValue && `&searchData=${searchValue}`
		}`
	);

	return response.data;
};

const OpportunitiesService = {
  createOpportunity,
	getInvestors,
};

export default OpportunitiesService;
