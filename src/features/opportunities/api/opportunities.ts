import type {
	Opportunity,
	OpportunityMin,
} from "@/features/opportunities/types/api";
import type { Opportunity as OpportunityFields } from "@/features/opportunities/types/fields";
import { authApiClient } from "@/utils/api-client";

const createOpportunity = async (body: OpportunityFields) => {
	const response = await authApiClient.post<Array<Opportunity>>(
		"/opportunities",
		body
	);

	return response.data;
};

const deleteOpportunity = async (opportunityId: string) => {
	const response = await authApiClient.delete(
		`/opportunities/${opportunityId}`
	);

	return response.data;
};

const getOpportunities = async () => {
	const response = await authApiClient.get<Array<OpportunityMin>>(
		"/opportunities"
	);

	return response.data;
};

const getOpportunity = async (opportunityId?: string) => {
	if (opportunityId) {
		const response = await authApiClient.get<Opportunity>(
			`/opportunities/${opportunityId}`
		);

		return response.data;
	}

	return;
};

const OpportunitiesService = {
	createOpportunity,
	deleteOpportunity,
	getOpportunities,
	getOpportunity,
};

export default OpportunitiesService;
