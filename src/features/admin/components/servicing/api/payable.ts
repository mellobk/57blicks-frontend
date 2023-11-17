import { authApiClient } from "../../../../../utils/api-client";
import type {
	Payable,
	PayableDetail,
	PayableStatus,
} from "../component/Payable/types";
import {
	type ApiParameters,
	payablesApi,
	payablesDetailApi,
} from "./backend-end-points";

export interface PayableApiProps {
	url: string;
}

export interface UpdatePayableApiProps {
	payables: Array<{
		id: string;
		status: PayableStatus;
	}>;
}

const getPayables = async (
	parameterData: PayableApiProps
): Promise<Array<Payable> | null> => {
	try {
		const parameters: ApiParameters = {
			link: parameterData.url,
		};
		const { data } = await authApiClient.get<Array<Payable>>(
			`${payablesApi(parameters)}`
		);

		return data;
	} catch {
		/* empty */
	}
	return null;
};

const getPayablesDetails = async (
	parameterData: PayableApiProps
): Promise<Array<PayableDetail> | null> => {
	try {
		const parameters: ApiParameters = {
			link: parameterData.url,
		};
		const { data } = await authApiClient.get<Array<PayableDetail>>(
			`${payablesDetailApi(parameters)}`
		);

		return data;
	} catch {
		return null;
	}
};

const updatePayables = async (
	parameterData: UpdatePayableApiProps
): Promise<boolean> => {
	try {
		await authApiClient.post(
			payablesApi({
				link: "approve",
			}),
			parameterData
		);
		return true;
	} catch {
		/* empty */
	}
	return false;
};

const ManagePayablesService = {
	getPayables,
	getPayablesDetails,
	updatePayables,
};

export default ManagePayablesService;
