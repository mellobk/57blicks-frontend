import { type ApiParameters, loanHistoricalApi } from "./backend-end-points";

import type { LoanHistory } from "../types/api";
import { authApiClient } from "@/utils/api-client";

interface LoanHistoryApiProps {
	url: string;
	id: string;
}

const getLoanHistoricalLoanId = async (
	parameterData: LoanHistoryApiProps
): Promise<Array<LoanHistory> | null> => {
	try {
		const parameters: ApiParameters = {
			link: parameterData.url,
			id: parameterData.id,
		};
		const { data } = await authApiClient.get<Array<LoanHistory>>(
			`${loanHistoricalApi(parameters)}`
		);

		return data;
	} catch {
		/* empty */
	}
	return null;
};
const ManageLoanHistoricalService = {
	getLoanHistoricalLoanId,
};

export default ManageLoanHistoricalService;
