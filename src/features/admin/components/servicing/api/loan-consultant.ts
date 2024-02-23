/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { authApiClient } from "@/utils/api-client";

const createNewLoanConsultant = async (body: { name: string }) => {
	const response = await authApiClient.post("/loan-consultants", body);

	return response.data;
};

const getAllLoansConsultants = async (): Promise<{
	data: { data: Array<{ name: string }> };
}> => {
	const response = await authApiClient.get<any>(`/loan-consultants`);
	return response.data;
};

const deleteLoanConsultant = async (id: string) => {
	const response = await authApiClient.delete(`/loan-consultants/${id}`);
	return response.data;
};

const ManageLoanConsultantService = {
	createNewLoanConsultant,
	getAllLoansConsultants,
	deleteLoanConsultant,
};

export default ManageLoanConsultantService;
