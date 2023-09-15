import { LoanFields } from "@/features/create-loan/types/fields.ts";
import { authApiClient } from "@/utils/api-client";

const createLoan = async (body: LoanFields) => {
	const response = await authApiClient.post<Array<LoanFields>>("/loans", body);

	return response.data;
};

const CreateLoanService = {
	createLoan,
};

export default CreateLoanService;
