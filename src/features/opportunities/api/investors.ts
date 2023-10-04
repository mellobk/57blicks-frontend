import { Investor, Opportunity } from "@/features/opportunities/types/api";
import { Opportunity as OpportunityFields } from "@/features/opportunities/types/fields";
import { authApiClient } from "@/utils/api-client";

const createOpportunity = async (body: OpportunityFields) => {
	const response = await authApiClient.post<Array<Opportunity>>(
		"/opportunities",
		body
	);

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

const getOpportunities = async () => {
	const response = await authApiClient.get<{ data: Array<Opportunity> }>(
		"/opportunities"
	);

	return response.data.data;
};

const OpportunitiesService = {
	createOpportunity,
	getInvestors,
	getOpportunities,
};

export default OpportunitiesService;
