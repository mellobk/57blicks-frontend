import type { Role } from "../types/role";
import { authApiClient } from "@/utils/api-client";
import { getRolesByUser } from "./backend-end-points";

const getRoleByUser = async (id: string) => {
	if (!id) return null;
	const response = await authApiClient.get<Role>(getRolesByUser(id));
	return response.data;
};

const ManageRoleService = {
	getRoleByUser,
};

export default ManageRoleService;
