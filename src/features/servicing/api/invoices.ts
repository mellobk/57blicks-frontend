import type { Invoice } from "../component/Invoice/types";
import { Ledgers } from "../component/Ledger/types";
import { authApiClient } from "@/utils/api-client";
import { invoices } from "./backend-end-points";

const getInvoiceByLoanId = async (
	id: string
): Promise<Array<Invoice> | null> => {
	try {
		const response = await authApiClient.get<Array<Invoice>>(
			`${invoices()}/get-by-loan/${id}?take=1000`
		);

		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

const getInvoiceDetails = async (
	id: number
): Promise<Array<Ledgers> | null> => {
	try {
		const response = await authApiClient.get<Array<Ledgers>>(
			`${invoices()}/get-details/${id}?take=1000`
		);

		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

const ManageInvoiceService = {
	getInvoiceByLoanId,
	getInvoiceDetails,
};

export default ManageInvoiceService;
