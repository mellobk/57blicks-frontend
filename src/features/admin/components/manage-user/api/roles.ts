import type { Role } from "../types/role.ts";
import { authApiClient } from "@/utils/api-client.ts";
import { getRolesByUser } from "./backend-end-points.ts";

const getRoleByUser = async (id: string) => {
	if (!id) return null;
	const response = await authApiClient.get<Role>(getRolesByUser(id));
	return response.data;
};

const ManageRoleService = {
	getRoleByUser,
};

export default ManageRoleService;
