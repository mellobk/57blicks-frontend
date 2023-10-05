import { Loan } from "@/features/create-loan/types/fields";
import { authApiClient } from "@/utils/api-client";

const loans = async (body: Loan) => {
	const response = await authApiClient.post<Array<Loan>>("/loans", body);

	return response.data;
};

const LoansService = {
	createLoan: loans,
};

export default LoansService;
