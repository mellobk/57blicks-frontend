import { authApiClient } from "@/utils/api-client";
import type { ILoanOverview } from "../types/fields";

const getLoanOverview = async (): Promise<ILoanOverview> => {
	const response = await authApiClient.get<ILoanOverview>("/loans/overview");
	return response.data;
};

export default {
	getLoanOverview,
};
