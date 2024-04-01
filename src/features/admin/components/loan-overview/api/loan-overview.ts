import { authApiClient } from "@/utils/api-client";
import type {
	ILoanOverview,
	UpdateParticipationBreakdownDto,
} from "../types/fields";

export const getLoanOverview = async (): Promise<ILoanOverview> => {
	const response = await authApiClient.get<ILoanOverview>("/loans/overview");
	return response.data;
};

export const updateTrustUnallocated = async (
	id: string,
	body: UpdateParticipationBreakdownDto
): Promise<void> => {
	await authApiClient.put(`/investors/investor-data/${id}`, body);
};
