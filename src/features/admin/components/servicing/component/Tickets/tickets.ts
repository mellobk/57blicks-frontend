/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Ticket } from "../../types/api";
import {
	ticketsApi,
	filterTicketData,
	deleteTicketsApi,
	updateTicketsApi,
	collateralApi,
} from "../../api/backend-end-points";

import { authApiClient } from "@/utils/api-client";
import { TicketStatusType } from "@/features/admin/pages/Support/types";

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

const updateCollateral = async (id: string, body: any): Promise<void> => {
	await authApiClient.put<Ticket>(collateralApi(id || ""), body);
};

const updateTicket = async (body: Ticket): Promise<void> => {
	body.status = TicketStatusType.CLOSED;

	await authApiClient.put<Ticket>(updateTicketsApi(body?.id), body);
};

const ManageTicketService = {
	getListTickets,
	filterAllTickets,
	deleteTicket,
	updateTicket,
	updateCollateral,
};

export default ManageTicketService;
