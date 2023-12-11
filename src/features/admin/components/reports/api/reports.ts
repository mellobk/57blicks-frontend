/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Loan } from "../../servicing/types/api";
import type { IReportAverageDays } from "../types/types";

import {
	allDefaultLoan,
	defaultInsuranceLoan,
	defaultInterestLoan,
	defaultTaxLoan,
	defaultUnauthorizedLoan,
	loanAssets,
	loanAverage,
	loanConsult,
	loanPaidAverageDays,
	loanProduct,
	paidOffLoan,
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

const getDefaultUnauthorizedLoan = async () => {
	const response = await authApiClient.get<{
		loansQuantity: number;
		defaultLoans: Array<Loan>;
	}>(defaultUnauthorizedLoan());
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

const getPaidOffLoans = async (days: string) => {
	const response = await authApiClient.get<{
		paid: { quantity: number; percentage: number };
		unPaid: { quantity: number; percentage: number };
		defaultLoans: Array<Loan>;
	}>(paidOffLoan(days));
	return response.data;
};

const getLoanConsultant = async () => {
	const response = await authApiClient.get<any>(loanConsult());
	return response.data;
};

const getLoanProduct = async () => {
	const response = await authApiClient.get<any>(loanProduct());
	return response.data;
};

const getLoanAssets = async () => {
	const response = await authApiClient.get<any>(loanAssets());
	return response.data;
};

const getLoanAverages = async () => {
	const response = await authApiClient.get<{
		averageLoan: number;
		averageInterestRate: number;
		defaultLoans: Array<Loan>;
	}>(loanAverage());
	return response.data;
};

const getLoanPaidAverageDays = async () => {
	const response = await authApiClient.get<IReportAverageDays>(
		loanPaidAverageDays()
	);
	return response.data;
};

const ManageReportsService = {
	getDefaultInsuranceLoan,
	getDefaultTaxLoan,
	getDefaultInterestLoan,
	getAllDefaultLoan,
	getPaidOffLoans,
	getLoanConsultant,
	getLoanProduct,
	getLoanAssets,
	getLoanAverages,
	getLoanPaidAverageDays,
	getDefaultUnauthorizedLoan,
};

export default ManageReportsService;
