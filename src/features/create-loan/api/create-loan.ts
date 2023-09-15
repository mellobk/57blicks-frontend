import { Loan } from "@/features/create-loan/types/fields";
import { authApiClient } from "@/utils/api-client";

const createLoan = async (body: Loan) => {
	const response = await authApiClient.post<Array<Loan>>("/loans", body);

	return response.data;
};

const CreateLoanService = {
	createLoan,
};

export default CreateLoanService;
