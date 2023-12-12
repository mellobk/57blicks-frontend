import { authApiClient } from "@/utils/api-client";
import { TicketStatusType, type CreateTicketForm } from "../types";

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
	isInternal: boolean;
}): Promise<void> => {
	await authApiClient.post(`/comments/${id}`, {
		content: newMessage,
		isInternal,
	});
};

export const uploadAttachment = async (
	file: Blob,
	ticketId: string
): Promise<void> => {
	const formData = new FormData();
	formData.append("file", file);

	await authApiClient.post(`/attachments/upload/${ticketId}`, formData);
};

export const downloadFile = async (filePath: string): Promise<string> => {
	const encodedFilePath = encodeURIComponent(filePath);

	const response = await authApiClient.get(
		`/files/download/${encodedFilePath}`
	);

	return response.data;
};
