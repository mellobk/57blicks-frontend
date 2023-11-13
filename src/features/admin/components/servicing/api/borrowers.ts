import { objectToQueryParameter } from "./../../../../../utils/convert-object-to-query-parameter";
import { authApiClient } from "../../../../../utils/api-client";
import { type ApiParameters, borrowersApi } from "./backend-end-points";
import type {
	Borrower,
	Loan,
} from "@/features/admin/components/servicing/types/api";
import type { ApiResponse } from "@/types/api/api-response";

export interface BorrowerCustomResponse extends Borrower {
	loans: Array<Loan>;
	selected: boolean;
	notes: boolean;
	email: boolean;
	sms: boolean;
	emailContent: string;
	smsContent: string;
}

export interface BorrowerApiProps {
	activeLoan: boolean;
	url: string;
}

const getBorrowers = async (
	parameterData: BorrowerApiProps
): Promise<ApiResponse<BorrowerCustomResponse> | null> => {
	try {
		const parameters: ApiParameters = {
			link: "",
		};
		const { data } = await authApiClient.get<
			ApiResponse<BorrowerCustomResponse>
		>(`${borrowersApi(parameters)}?${objectToQueryParameter(parameterData)}`);
		return data;
	} catch {
		/* empty */
	}
	return null;
};

const ManageBorrowersService = {
	getBorrowers,
};

export default ManageBorrowersService;
