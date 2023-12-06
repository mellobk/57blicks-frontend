import { LogAction, LogTable, type UserActivity } from "../types/logs";
import { authApiClient } from "@/utils/api-client";
import { createLog } from "./backend-end-points";

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

const getUserOpportunitiesMetrics = async (
	id: string
): Promise<{
	rejectInvestment: number;
	approveInvestment: number;
	getAllOpportunities: number;
} | null> => {
	try {
		const response = await authApiClient.get<{
			rejectInvestment: number;
			approveInvestment: number;
			getAllOpportunities: number;
		}>(`/opportunities/investor-metrics/${id}`);

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
	getUserOpportunitiesMetrics,
};

export default ManageLogService;
