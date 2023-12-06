import { authApiClient } from "@/utils/api-client";
import { TicketStatusType, type CreateTicketForm } from "../types";


export const getSearchAdminTickets = async (
	page: number,
	take: number,
	query: string,
	status: string,
	category: string,
	priority: string
): Promise<void> => {
	const parameters = new URLSearchParams({
		page: page.toString(),
		take: take.toString(),
		q: query,
		status,
		category,
		priority,
	});

	const response = await authApiClient.get(
		`/tickets/admin?${parameters.toString()}`
	);
	return response.data;
};


export const postTicket = async (ticketData: CreateTicketForm): Promise<void> => {
	ticketData.status = TicketStatusType.OPEN;
  await authApiClient.post('/tickets', ticketData);  
};
