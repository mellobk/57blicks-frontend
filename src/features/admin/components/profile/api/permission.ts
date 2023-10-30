import { authApiClient } from "@/utils/api-client";
import {
	addPermissionGroupPermissionData,
	createPermissionsGroups,
	deletePermissionData,
} from "./backend-end-points";
import type { PermissionGroup } from "@/features/admin/components/manage-user/types/api";

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

const ManagePermissionGroupService = {
	createPermissionGroup,
	deletePermissionGroup,
	addPermissionGroup,
};

export default ManagePermissionGroupService;
