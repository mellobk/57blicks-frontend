import type { UserNotification } from "@/types/api/notifications.ts";
import type { Loan, Notification } from "../types/types";
import {
	createNotificationData,
	readAllNotification,
	updateLedger,
	updateUserNotificationData,
	userNotification,
} from "./backend-end-points";

import { authApiClient } from "@/utils/api-client";

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

const putReadUserNotification = async () => {
	const response = await authApiClient.post<Notification>(
		readAllNotification(),

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
	putLedger,
	createNotifications,
	putUserNotification,
	getUserNotification,
  putReadUserNotification
};

export default ManageNotificationService;
