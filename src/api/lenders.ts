import type { Lender } from "@/types/api/lender";
import type { Pagination } from "@/types/api/pagination";
import { authApiClient } from "@/utils/api-client";

const getLenders = async (): Promise<Array<Lender>> => {
	const response = await authApiClient.get<Pagination<Array<Lender>>>("/lenders");

	return response.data.data;
};

const getLenderById = async (
	id: string,
	searchValue: string
): Promise<Lender> => {
	const response = await authApiClient.get<Lender>(
		`/lenders/${id}?searchData=${searchValue && `&searchData=${searchValue}`}`
	);

	return response.data;
};

const LendersService = {
	getLenders,
	getLenderById,
};

export default LendersService;
