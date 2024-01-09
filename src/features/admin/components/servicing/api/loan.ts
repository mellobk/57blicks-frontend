import { authApiClient } from "@/utils/api-client";
import { deleteLoanApi } from "./backend-end-points";

const deleteLoan = async (id: string) => {
	return authApiClient.delete<string>(deleteLoanApi(id));
};

const ManageLoanService = {
	deleteLoan,
};

export default ManageLoanService;
