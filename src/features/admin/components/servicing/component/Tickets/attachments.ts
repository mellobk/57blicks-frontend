import type {
	Attachment,
	AttachmentResponse,
} from "src/features/admin/pages/Support/types/index.ts";
import { getAttachmentsData } from "../../api/backend-end-points";

import { authApiClient } from "@/utils/api-client";

const getListAttachment = async (): Promise<Array<Attachment> | null> => {
	const response = await authApiClient.get<AttachmentResponse>(
		`${getAttachmentsData()}`
	);

	return response.data.data;
};

const updateAttachment = async (
	body: File,
	ticketID: string
): Promise<void> => {
	try {
		const response = await authApiClient.post<Attachment>(
			`/attachments/upload/${ticketID}`,
			body
		);
		console.log("Update successful. Response:", response.data);
	} catch (error) {
		console.error("Error updating attachment:", error);
	}
};

const ManageAttachmentService = {
	getListAttachment,
	uploadAttachment: updateAttachment,
};

export default ManageAttachmentService;
