import type { LedgerFormValues, Ledgers } from "../component/Ledger/types";
import {
	deleteLedgerApi,
	ledgers,
	ledgersChangeStatus,
} from "./backend-end-points";

import type { Ledger } from "@/features/admin/components/servicing/component/Ledger/types";
import { authApiClient } from "@/utils/api-client";

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

const createLedger = async (
	data: LedgerFormValues
): Promise<Array<Ledger> | null> => {
	try {
		return await authApiClient.post(ledgers(), data);
	} catch {
		return null;
	}
};

const changeStatusLedger = async (data: Ledger): Promise<Ledger | null> => {
	try {
		return await authApiClient.put(ledgersChangeStatus(data.id), data);
	} catch {
		return null;
	}
};

const deleteLedger = async (id: string): Promise<void> => {
	await authApiClient.delete<Array<Ledger>>(deleteLedgerApi(id));
};

const ManageLedgerService = {
	createLedger,
	changeStatusLedger,
	getLedgerByLoanId,
	deleteLedger,
};

export default ManageLedgerService;
