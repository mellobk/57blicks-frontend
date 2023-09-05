/* eslint-disable @typescript-eslint/no-unsafe-return */
import { fetchData } from "@/utils/api-client";
import type { Investor } from "../types/api";
import { filterData, investors, userFilterData } from "./backend-end-points";

const filterAllInvestors = async (searchData: string, showDisable: boolean) => {
	const response = fetchData(filterData(showDisable, searchData), "GET");
	return response;
};

const filterAllAdmins = async (searchData: string) => {
	const response = fetchData(userFilterData("admin", searchData), "GET");
	return response;
};

const filterAllAccounting = async (searchData: string) => {
	const response = fetchData(userFilterData("accounting", searchData), "GET");
	return response;
};

const updateInvestors = async (body: Investor) => {
	const response = fetchData(investors(body?.id || ""), "PUT", body);
	return response;
};

const ManageUsersService = {
	filterAllInvestors,
	filterAllAdmins,
	filterAllAccounting,
	updateInvestors,
};

export default ManageUsersService;
