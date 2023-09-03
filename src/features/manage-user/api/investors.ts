import { authApiClient } from "@/utils/api-client";
import type { Investor } from "../types/api";
import { filterData } from "./backend-end-points";

const filterAllInvestors = async (searchData: string, showDisable: boolean) => {
	const response = await authApiClient.post<Array<Investor>>(filterData, {
		searchData,
		showDisable,
	});
	return response.data;
};

const InvestorsService = {
	filterAllInvestors,
};

export default InvestorsService;
