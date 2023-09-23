import type { UserActivity } from "../types/logs";
import { authApiClient } from "@/utils/api-client";

const endpoint = "logs";

const getUserActivity = async (
	id: string,
	date: Date
): Promise<UserActivity | null> => {
	try {
		const response = await authApiClient.get<UserActivity>(
			`${endpoint}/user-activity/?id=${id}&date=${date
				.toISOString()
				.slice(0, 10)}`
		);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ file: logs.ts:15 ~ getUserActivity ~ err:", error);
	}
	return null;
};

const ManageLogService = {
	getUserActivity,
};

export default ManageLogService;
