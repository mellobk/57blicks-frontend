import type { IBorrowerInformation } from "../types/api.ts";
import { updateBorrowerData } from "./backend-end-points.ts";

import { authApiClient } from "@/utils/api-client.ts";

const updateBorrowerInfo = async (
	id: string,
	body: IBorrowerInformation
): Promise<IBorrowerInformation> => {
	const response = await authApiClient.put<IBorrowerInformation>(
		updateBorrowerData(id),
		body
	);
	return response.data;
};

const DkcLendersService = {
	updateBorrowerInfo,
};

export default DkcLendersService;
