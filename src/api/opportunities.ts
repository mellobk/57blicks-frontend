import type { Opportunity as OpportunityFields } from "@/features/admin/components/opportunities/types/fields";
import type { Opportunity } from "@/types/api/opportunity";
import type { OpportunityMin } from "@/types/api/opportunity-min";
import type { Upload } from "@/types/api/upload";
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
	const response =
		await authApiClient.get<Array<OpportunityMin>>("/opportunities");

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

const uploadOpportunity = async (file: Blob) => {
	let formData = new FormData();
	formData.append("file", file);

	const response = await authApiClient.post<Upload>(
		"/opportunities/upload",
		formData
	);

	return response.data;
};

const OpportunitiesService = {
	createOpportunity,
	deleteOpportunity,
	getOpportunities,
	getOpportunity,
	uploadOpportunity,
};

export default OpportunitiesService;
