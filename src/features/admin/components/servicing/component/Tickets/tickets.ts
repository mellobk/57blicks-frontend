/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Ticket  } from "../../types/api";
import {
	ticketsApi
} from "../../api/backend-end-points";

import { authApiClient } from "@/utils/api-client";

const getListTickets = async (): Promise<Array<Ticket> | null> => {
	try {
		const response = await authApiClient.get<Array<Ticket>>(
			`${ticketsApi()}`
		);
		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

// const getInvoiceDetails = async (
// 	id: number
// ): Promise<Array<Ledgers> | null> => {
// 	try {
// 		const response = await authApiClient.get<Array<Ledgers>>(
// 			`${invoices()}/get-details/${id}?take=1000`
// 		);

// 		return response.data;
// 	} catch {
// 		/* empty */
// 	}

// 	return null;
// };

// const sendInvoice = async (data: InvoiceSend): Promise<void> => {
// 	try {
// 		await authApiClient.post(sendInvoices(), data);
// 	} catch {
// 		/* empty */
// 	}
// };

// const downloadInvoice = async (invoiceId: number): Promise<string> => {
// 	try {
// 		const data = await authApiClient.post(downloadInvoiceApi(invoiceId), {});
// 		return data.data;
// 	} catch {
// 		/* empty */
// 	}
// 	return "";
// };

const ManageTicketService = {
	getListTickets,
};

export default ManageTicketService;
