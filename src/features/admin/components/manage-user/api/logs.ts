import { LogAction, LogTable, type UserActivity } from "../types/logs.ts";
import { authApiClient } from "@/utils/api-client.ts";
import { createLog } from "./backend-end-points.ts";

const endpoint = "logs";

const getUserActivity = async (
	id: string,
	date: Date
): Promise<UserActivity | null> => {
	try {
		const response = await authApiClient.get<UserActivity>(
			`${endpoint}/user-activity/?id=${id}&endDate=${date
				.toISOString()
				.slice(0, 10)}`
		);

		return response.data;
	} catch (error) {
		console.log("🚀 ~ file: logs.ts:15 ~ getUserActivity ~ err:", error);
	}
	return null;
};

const createLoginLog = async () => {
	try {
		const data = {
			event: LogAction.USER_LOGIN,
			entity: LogTable.USER,
		};

    return await authApiClient.post(createLog(), data);
	} catch (error) {
		return error;
	}
};
const ManageLogService = {
	getUserActivity,
	createLoginLog,
};

export default ManageLogService;
