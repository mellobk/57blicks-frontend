/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Ticket } from "../../types/api";
import {
	ticketsApi,
	filterTicketData,
	deleteTicketsApi,
	updateTicketsApi,
} from "../../api/backend-end-points";

import { authApiClient } from "@/utils/api-client";
import { TicketStatusType, type CreateTicketForm } from "@/features/admin/pages/Support/types";

const getListTickets = async (): Promise<Array<Ticket> | null> => {
	try {
		const response = await authApiClient.get<Array<Ticket>>(`${ticketsApi()}`);
		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

const filterAllTickets = async (searchData: string, status: string) => {
	const response = await authApiClient.get<Array<Ticket>>(
		filterTicketData(searchData, status)
	);
	return response.data;
};

const deleteTicket = async (id: string): Promise<void> => {
	await authApiClient.delete<Array<Ticket>>(deleteTicketsApi(id));
};

const updateTicket = async (body: CreateTicketForm): Promise<void> => {

	body.status = TicketStatusType.CLOSED;

	await authApiClient.put<Ticket>(
		updateTicketsApi(body.id),
		body
	);
};

const ManageTicketService = {
	getListTickets,
	filterAllTickets,
	deleteTicket,
	updateTicket,
};

export default ManageTicketService;
