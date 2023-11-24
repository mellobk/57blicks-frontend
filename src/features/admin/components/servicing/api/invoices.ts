/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Invoice, InvoiceSend } from "../component/Invoice/types";
import {
	downloadInvoiceApi,
	invoices,
	sendInvoices,
} from "./backend-end-points";

import type { Ledgers } from "../component/Ledger/types";
import { authApiClient } from "@/utils/api-client";

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
	id: string
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

const downloadInvoice = async (invoiceId: string): Promise<string> => {
	try {
		const data = await authApiClient.post(downloadInvoiceApi(invoiceId), {});
		return data.data;
	} catch {
		/* empty */
	}
	return "";
};

const ManageInvoiceService = {
	getInvoiceByLoanId,
	getInvoiceDetails,
	sendInvoice,
	downloadInvoice,
};

export default ManageInvoiceService;
