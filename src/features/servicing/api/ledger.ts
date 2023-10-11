import type { LedgerFormValues, Ledgers } from "../component/Ledger/types";

import type { Ledger } from "../../../features/servicing/component/Ledger/types";
import { authApiClient } from "@/utils/api-client";
import { ledgers } from "./backend-end-points";

const getLedgerByLoanId = async (
	id: string
): Promise<Array<Ledgers> | null> => {
	try {
		const response = await authApiClient.get<Array<Ledger>>(
			`${ledgers()}/get-by-loan/${id}?take=1000`
		);

		return response.data;
	} catch {
		/* empty */
	}
	return null;
};

const createLedger = async (data: LedgerFormValues) => {
	try {
		const response = await authApiClient.post(ledgers(), data);
		return response;
	} catch (error) {
		return error;
	}
};
const ManageLedgerService = {
	createLedger,
	getLedgerByLoanId,
};

export default ManageLedgerService;
