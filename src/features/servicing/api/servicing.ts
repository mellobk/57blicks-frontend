/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authApiClient } from "@/utils/api-client";
import type { IBorrowerInformation, DkcLenders } from "../types/api";
import { lenders, lendersById, updateBorrowerData } from "./backend-end-points";

const getLenders = async (): Promise<DkcLenders> => {
	const response = await authApiClient.get<DkcLenders>(lenders());
	return response.data;
};

const getLenderById = async (
	id: string,
	search: string
): Promise<DkcLenders> => {
	const response = await authApiClient.get<DkcLenders>(lendersById(id, search));
	return response.data;
};

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
	getLenders,
	getLenderById,
	updateBorrowerInfo,
};

export default DkcLendersService;
