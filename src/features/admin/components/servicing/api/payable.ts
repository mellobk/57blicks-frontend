/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { authApiClient } from "../../../../../utils/api-client";
import type { Payable, PayableStatus } from "../component/Payable/types";
import type {
	PayableDetail,
	PayableDetailPending,
} from "../component/Payable/types/payable-details";
import {
	type ApiParameters,
	payablesApi,
	payablesDetailApi,
} from "./backend-end-points";

export interface PayableApiProps {
	url: string;
}

export interface PayableByInvestorApiProps {
	url: string;
	id: string;
	type: string;
}

export interface UpdatePayableApiProps {
	payables: Array<{
		id: string;
		status: PayableStatus;
	}>;
}

export interface BulkApprovalBody {
	payableDetails: Array<{ id: string }>;
}

export interface PayableApproval extends Payable {
	selected: boolean;
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

const getPayablesDetailsPending = async (
	parameterData: PayableApiProps
): Promise<Array<PayableDetailPending> | null> => {
	try {
		const parameters: ApiParameters = {
			link: parameterData.url,
		};
		const { data } = await authApiClient.get<Array<PayableDetailPending>>(
			`${payablesDetailApi(parameters)}`
		);

		return data;
	} catch {
		return null;
	}
};

const getPayablesDetailsByInvestor = async (
	parameterData: PayableByInvestorApiProps
): Promise<Array<PayableApproval> | null> => {
	try {
		const parameters: ApiParameters = {
			link: parameterData.url,
		};
		const { data } = await authApiClient.post(
			payablesDetailApi(parameters),
			parameterData
		);
		return data as Array<PayableApproval>;
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

const bulkApprovalPayableDetail = async (
	body: BulkApprovalBody
): Promise<boolean> => {
	try {
		await authApiClient.post(
			payablesDetailApi({
				link: "bulk-approval",
			}),
			body
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
	getPayablesDetailsPending,
	getPayablesDetailsByInvestor,
	bulkApprovalPayableDetail,
};

export default ManagePayablesService;
