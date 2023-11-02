import { authApiClient } from "@/utils/api-client";
import { loggedUserInformation } from "./backend-end-points";
import type { User } from "@/features/admin/components/manage-user/types/api";

const getMyUserInfo = async (): Promise<User> => {
	const response = await authApiClient.get<User>(loggedUserInformation());
	return response.data;
};

const DashboardUserService = {
	getMyUserInfo,
};

export default DashboardUserService;
