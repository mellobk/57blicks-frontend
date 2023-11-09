import { authApiClient } from "../../../../../utils/api-client";
import {
	type ApiParameters,
	borrowerNotificationsApi,
} from "./backend-end-points";

export interface BorrowerNotificationProps {
	loans: Array<{ id: string }>;
	url: string;
	smsMessage?: string;
	emailMessage?: string;
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
