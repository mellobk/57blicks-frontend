import type { Loan } from "../../servicing/types/api";

import {
	allDefaultLoan,
	defaultInsuranceLoan,
	defaultInterestLoan,
	defaultTaxLoan,
} from "./backend-end-points";

import { authApiClient } from "@/utils/api-client";

const getDefaultInsuranceLoan = async () => {
	const response = await authApiClient.get<{
		loansQuantity: number;
		defaultLoans: Array<Loan>;
	}>(defaultInsuranceLoan());
	return response.data;
};

const getDefaultTaxLoan = async () => {
	const response = await authApiClient.get<{
		loansQuantity: number;
		defaultLoans: Array<Loan>;
	}>(defaultTaxLoan());
	return response.data;
};

const getDefaultInterestLoan = async () => {
	const response = await authApiClient.get<{
		loansQuantity: number;
		defaultLoans: Array<Loan>;
	}>(defaultInterestLoan());
	return response.data;
};

const getAllDefaultLoan = async () => {
	const response = await authApiClient.get<{
		tax: { quantity: number; percentage: number };
		insurance: { quantity: number; percentage: number };
		interest: { quantity: number; percentage: number };
		unauthorized: { quantity: number; percentage: number };
		defaultLoans: Array<Loan>;
	}>(allDefaultLoan());
	return response.data;
};

const ManageReportsService = {
	getDefaultInsuranceLoan,
	getDefaultTaxLoan,
	getDefaultInterestLoan,
	getAllDefaultLoan,
};

export default ManageReportsService;
