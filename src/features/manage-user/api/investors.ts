import { AddAccountingFields, AddAdminFields } from "../types/fields";
import type { Investor, User } from "../types/api";
import {
	createAccounting,
	createAdmin,
	createInvestor,
	deleteUserData,
	filterData,
	getUserData,
	investors,
	updateAccountingUrl,
	updateAdminUrl,
	userFilterData,
} from "./backend-end-points";

import { AxiosResponse } from "axios";
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authApiClient } from "@/utils/api-client";

const getUser = async (sub: string) => {
	const response = await authApiClient.get<User>(getUserData(sub));
	return response.data;
};

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
	const response = await authApiClient.put<Array<Investor>>(
		investors(body?.id || ""),
		body
	);
	return response.data;
};

const updateAdmin = async (
	body: AddAdminFields
): Promise<AxiosResponse<Array<User>, unknown>> => {
	const response = await authApiClient.put<Array<User>>(
		updateAdminUrl(body.id || ""),
		body
	);
	return response;
};

const updateAccounting = async (
	body: AddAccountingFields
): Promise<AxiosResponse<Array<User>, unknown>> => {
	const response = await authApiClient.put<Array<User>>(
		updateAccountingUrl(body.id || ""),
		body
	);
	return response;
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
	getUser,
	updateAdmin,
	updateAccounting,
};

export default ManageUsersService;
