import type { Invoice, InvoiceSend } from "../component/Invoice/types";
import { invoices, sendInvoices } from "./backend-end-points.ts";

import type { Ledgers } from "../component/Ledger/types";
import { authApiClient } from "@/utils/api-client.ts";

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

const sendInvoice = async (data: InvoiceSend): Promise<void> => {
	try {
		await authApiClient.post(sendInvoices(), data);
	} catch {
		/* empty */
	}
};

const ManageInvoiceService = {
	getInvoiceByLoanId,
	getInvoiceDetails,
	sendInvoice,
};

export default ManageInvoiceService;
