import type { Loan } from "@/types/api/loan";
import type { Loan as LoanField } from "@/types/fields/loan";
import { authApiClient } from "@/utils/api-client";

const createLoan = async (body: LoanField): Promise<Loan> => {
	const response = await authApiClient.post<Loan>("/loans", body);

	return response.data;
};

const getLoan = async (id: string): Promise<Loan> => {
	const response = await authApiClient.get<Loan>(`/loans/${id}`);

	return response.data;
};

const updateLoan = async (id: string, body: LoanField): Promise<Loan> => {
	const response = await authApiClient.put<Loan>(`/loans/${id}`, body);

	return response.data;
};

const LoansService = {
	createLoan,
	getLoan,
	updateLoan,
};

export default LoansService;
