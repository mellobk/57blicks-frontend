import { authApiClient } from "@/utils/api-client.ts";
import type { User } from "@/features/admin/components/manage-user/types/api.ts";

const getMyInfo = async (): Promise<User> => {
	const response = await authApiClient.get<User>("/users/user/my-info");
	return response.data;
};

const UserService = {
	getMyInfo,
};

export default UserService;
