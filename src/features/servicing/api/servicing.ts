/* eslint-disable @typescript-eslint/no-unsafe-call */
import { authApiClient } from "@/utils/api-client";
import type { DkcLenders } from "../types/api";
import { lenders, lendersById } from "./backend-end-points";

const getLenders = async (): Promise<DkcLenders> => {
	const response = await authApiClient.get<DkcLenders>(lenders());
	return response.data;
};

const getLenderById = async (id: string): Promise<DkcLenders> => {
	const response = await authApiClient.get<DkcLenders>(lendersById(id));
	return response.data;
};

const DkcLendersService = {
	getLenders,
	getLenderById,
};

export default DkcLendersService;
