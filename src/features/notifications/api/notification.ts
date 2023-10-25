import type { UserNotification } from "@/components/layout/types/notifications";
import type { Loan, Notification } from "../types/types";
import {
	createNotificationData,
	getLoansById,
	updateLedger,
	updateLoan,
	updateUserNotificationData,
	userNotification,
} from "./backend-end-points";

import { authApiClient } from "@/utils/api-client";

const loansById = async (id: string): Promise<Loan> => {
	const response = await authApiClient.get<Loan>(getLoansById(id));

	return response.data;
};

const putLoan = async (id: string, body: Loan) => {
	const response = await authApiClient.put<Loan>(updateLoan(id), body);
	return response.data;
};

const putLedger = async (id: string, body: Loan) => {
	const response = await authApiClient.put<Loan>(updateLedger(id), body);
	return response.data;
};
const putUserNotification = async (id: string, body: Notification) => {
	const response = await authApiClient.put<Notification>(
		updateUserNotificationData(id),
		body
	);
	return response.data;
};

const createNotifications = async (body: Notification) => {
	const response = await authApiClient.post<Notification>(
		createNotificationData(),
		body
	);
	return response.data;
};

const getUserNotification = async () => {
	const response = await authApiClient.get<UserNotification>(
		userNotification()
	);
	return response.data;
};

const ManageNotificationService = {
	loansById,
	putLoan,
	putLedger,
	createNotifications,
	putUserNotification,
	getUserNotification,
};

export default ManageNotificationService;
