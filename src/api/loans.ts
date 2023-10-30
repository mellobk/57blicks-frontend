import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { authApiClient } from "@/utils/api-client";

const createLoan = async (body: Loan) => {
	const response = await authApiClient.post<Loan>("/loans", body);

	return response.data;
};

const LoansService = {
	createLoan,
};

export default LoansService;
