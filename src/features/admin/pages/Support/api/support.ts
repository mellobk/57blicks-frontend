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

export const postTicket = async (
	ticketData: CreateTicketForm
): Promise<void> => {
	ticketData.status = TicketStatusType.OPEN;
	console.log();
	await authApiClient.post("/tickets", ticketData);
};

export const sentTicket = async ({
	id,
	newMessage,
	isInternal,
}: {
	id: string;
	newMessage: string;
	isInternal: boolean
}): Promise<void> => {
	console.log("WHAT IS MESSAGE ----> ", newMessage)
	await authApiClient.post(`/comments/${id}`, { content: newMessage, isInternal });
};

export const uploadAttachment = async (file: Blob, ticketId: string): Promise<void> => {
	const formData = new FormData();
	formData.append("file", file);

	await authApiClient.post(
		`/attachments/upload/${ticketId}`,
		formData
	);
};

export const downloadFile = async (filePath: string): Promise<Blob> => {
	// Use encodeURIComponent to ensure proper URL encoding of the file path
	const encodedFilePath = encodeURIComponent(filePath);
  
	// Use the authApiClient to make the GET request
	const response = await authApiClient.get(`/files/download/${encodedFilePath}`, {
	  responseType: 'blob', // Specify the response type as blob for binary data
	});
	console.log('whta is response.data', response.data)
	return response.data;
  };
