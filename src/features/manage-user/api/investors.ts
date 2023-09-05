import { authApiClient } from "@/utils/api-client";
import type { Investor, User } from "../types/api";
import { filterData, investors, userFilterData } from "./backend-end-points";

const filterAllInvestors = async (searchData: string, showDisable: boolean) => {
	const response = await authApiClient.get<Array<Investor>>(
		filterData(showDisable, searchData)
	);
	return response.data;
};

const filterAllAdmins = async (searchData: string) => {
	const response = await authApiClient.get<Array<User>>(
		userFilterData("admin", searchData)
	);
	return response.data;
};

const filterAllAccounting = async (searchData: string) => {
	const response = await authApiClient.get<Array<User>>(
		userFilterData("accounting", searchData)
	);
	return response.data;
};

const updateInvestors = async (body: Investor) => {
	const response = await authApiClient.put<Array<User>>(
		investors(body?.id || ""),
		body
	);
	return response.data;
};
/* const updateInvestors = async (body: Investor) => {
	const response = fetchData(investors(body?.id || ""), "PUT", body);
	return response;
}; */

const ManageUsersService = {
	filterAllInvestors,
	filterAllAdmins,
	filterAllAccounting,
	updateInvestors,
};

export default ManageUsersService;