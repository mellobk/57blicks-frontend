import { authApiClient } from "../../../../../utils/api-client";
import {
	type ApiParameters,
	borrowerNotificationsApi,
} from "./backend-end-points";

export interface LoanDataNotification {
	id: string;
	email?: boolean;
	sms?: boolean;
	smsContent?: string;
	emailContent?: string;
}

export interface BorrowerNotificationProps {
	loans: Array<LoanDataNotification>;
	url: string;
}

const sendBorrowerNotification = async (
	data: BorrowerNotificationProps
): Promise<void> => {
	try {
		const parameters: ApiParameters = {
			link: data.url,
		};
		await authApiClient.post(borrowerNotificationsApi(parameters), data);
	} catch {
		/* empty */
	}
};

const ManageBorrowerNotificationsService = {
	sendBorrowerNotification,
};

export default ManageBorrowerNotificationsService;
