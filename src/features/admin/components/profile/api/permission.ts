/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authApiClient } from "@/utils/api-client";
import {
	addPermissionGroupPermissionData,
	createPermissionsGroups,
	deletePermissionData,
  globalSearchApp,
} from "./backend-end-points";
import type { IGlobalSearch, PermissionGroup }  from "../../manage-user/types/api";


const createPermissionGroup = async (body: PermissionGroup) => {
	const response = await authApiClient.post<Array<any>>(
		createPermissionsGroups(),
		body
	);
	return response.data;
};

const addPermissionGroup = async (body: Array<PermissionGroup>) => {
	const response = await authApiClient.post<Array<PermissionGroup>>(
		addPermissionGroupPermissionData(),
		body
	);
	return response.data;
};

const deletePermissionGroup = async (id: string) => {
	const response = await authApiClient.delete(deletePermissionData(id));
	return response.data;
};

const getGlobalSearchData = async (search: string) => {
	const response = await authApiClient.get<IGlobalSearch>(globalSearchApp(search));
	return response.data;
};


const ManagePermissionGroupService = {
	createPermissionGroup,
	deletePermissionGroup,
	addPermissionGroup,
  getGlobalSearchData
};

export default ManagePermissionGroupService;
