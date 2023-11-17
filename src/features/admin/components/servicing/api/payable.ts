import { authApiClient } from "../../../../../utils/api-client";
import {
	type ApiParameters,
	payablesApi,
	payablesDetailApi,
} from "./backend-end-points";

import type { Payable, PayableDetail } from "../component/Payable/types";
import type { AxiosResponse } from "axios";

export interface PayableApiProps {
	url: string;
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

const ManagePayablesService = {
	getPayables,
	getPayablesDetails,
};

export default ManagePayablesService;
