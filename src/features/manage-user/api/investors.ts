import { authApiClient } from "@/utils/api-client";
import type { Investor, User } from "../types/api";
import {
	createAccounting,
	createAdmin,
	createInvestor,
	deleteUserData,
	filterData,
	investors,
	userFilterData,
} from "./backend-end-points";

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

const createNewAdmin = async (body: Investor) => {
	const response = await authApiClient.post<Array<User>>(createAdmin(), body);
	return response.data;
};

const createNewAccounting = async (body: Investor) => {
	const response = await authApiClient.post<Array<User>>(
		createAccounting(),
		body
	);
	return response.data;
};

const createNewInvestor = async (body: Investor) => {
	const response = await authApiClient.post<Array<User>>(
		createInvestor(),
		body
	);
	return response.data;
};

const deleteUser = async (id: string) => {
	const response = await authApiClient.delete<Array<User>>(deleteUserData(id));
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
	createNewAdmin,
	createNewAccounting,
	createNewInvestor,
	deleteUser,
};

export default ManageUsersService;
