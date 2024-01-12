/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Opportunity as OpportunityFields } from "@/features/admin/components/opportunities/types/fields";
import type { Opportunity } from "@/types/api/opportunity";
import type { OpportunityMin } from "@/types/api/opportunity-min";
import type { Upload } from "@/types/api/upload";
import { authApiClient } from "@/utils/api-client";

const createOpportunity = async (body: OpportunityFields) => {
	const response = await authApiClient.post<any>("/opportunities", body);

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

const getMyOpportunities = async (id: string) => {
	const response = await authApiClient.get<Array<OpportunityMin>>(
		`/opportunities/my-opportunities/${id}`
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

const getNotificationStatusOpportunity = async (
	opportunityId?: string,
	investorId?: string
) => {
	if (opportunityId) {
		const response = await authApiClient.get<Opportunity>(
			`/investments/status/${investorId}/${opportunityId}`
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

const uniqueUsers = async (body: OpportunityFields) => {
	const response = await authApiClient.post<Opportunity>(
		"/notifications/unique-users/opportunities",
		body
	);

	return response.data;
};

const userNotifications = async (body: any) => {
	const response = await authApiClient.post<any>("/user-notifications", body);

	return response.data;
};

const OpportunitiesService = {
	createOpportunity,
	deleteOpportunity,
	getOpportunities,
	getOpportunity,
	uploadOpportunity,
	uniqueUsers,
	userNotifications,
	getMyOpportunities,
	getNotificationStatusOpportunity,
};

export default OpportunitiesService;
