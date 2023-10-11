import type { Investor } from "@/features/opportunities/types/api";
import { authApiClient } from "@/utils/api-client";

const getInvestors = async () => {
	const response = await authApiClient.get<Array<Investor>>(
		"/investors/filter-data/?canShowDisable=false"
	);

	return response.data;
};

const InvestorsService = {
	getInvestors,
};

export default InvestorsService;
