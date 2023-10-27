import { Lender } from "@/types/api/lender";
import { authApiClient } from "@/utils/api-client";

const getLenders = async (): Promise<Lender> => {
	const response = await authApiClient.get<Lender>("/lenders");
	return response.data;
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
