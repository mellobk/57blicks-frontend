/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Loan, Notification } from "../types/types";
import {
	createNotificationData,
	readAllNotification,
	updateFundingBreakDown,
	updateInvestmentStatus,
	updateLedger,
	updateUserNotificationData,
	userNotification,
} from "./backend-end-points";

import type { Ledgers } from "../components/Ledger/types";
import type { Loan as LoanLedger } from "@/features/admin/components/create-loan/types/fields";
import type { UserNotification } from "@/types/api/notifications.ts";
import { authApiClient } from "@/utils/api-client";

export interface UpdateLedgerProps extends Ledgers {}

const putLedger = async (updateLedgerProps: UpdateLedgerProps) => {
	const response = await authApiClient.put<Loan>(
		updateLedger(updateLedgerProps.id as string),
		updateLedgerProps
	);
	return response.data;
};
const putUserNotification = async (id: string, body: Notification) => {
	const response = await authApiClient.put<Notification>(
		updateUserNotificationData(id),
		body
	);
	return response.data;
};

const putInvestmentStatus = async (
	investorId: string,
	opportunityId: string,
	body: Notification
) => {
	const response = await authApiClient.put<any>(
		updateInvestmentStatus(investorId, opportunityId),
		body
	);
	return response.data;
};

const putReadUserNotification = async () => {
	const response = await authApiClient.post<Notification>(
		readAllNotification()
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

const getUserNotification = async (type: string) => {
	const response = await authApiClient.get<UserNotification>(
		userNotification(type)
	);
	return response.data;
};

const updateFundingBreakdown = async (loan: LoanLedger) => {
	const response = await authApiClient.put<LoanLedger>(
		updateFundingBreakDown(loan.id as string),
		loan
	);
	return response.data;
};

const ManageNotificationService = {
	putLedger,
	createNotifications,
	putUserNotification,
	getUserNotification,
	putReadUserNotification,
	updateFundingBreakdown,
	putInvestmentStatus,
};

export default ManageNotificationService;
