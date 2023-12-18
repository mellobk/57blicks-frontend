/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { Chat } from "src/features/admin/pages/Support/types/index.ts";
import { getChatsData, setChatsData } from "../../api/backend-end-points";

import { authApiClient } from "@/utils/api-client";

const getChat = async (ticketId: string): Promise<Array<Chat> | null> => {
	try {
		const response = await authApiClient.get<Array<Chat>>(
			`${getChatsData(ticketId)}`
		);
		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

const sentChat = async (body: string, id: string): Promise<Chat | null> => {
	try {
		const response = await authApiClient.post<Chat>(
			`${setChatsData(id)}`,
			body
		);
		return response.data;
	} catch {
		/* empty */
	}

	return null;
};

const ManageChatService = {
	getChat,
	sentChat,
};

export default ManageChatService;
