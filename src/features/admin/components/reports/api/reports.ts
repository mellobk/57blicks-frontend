/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Loan } from "../../servicing/types/api";
import type { IReportAverageDays } from "../types/types";

import {
	allDefaultInterestLoan,
	allDefaultLoan,
	defaultInsuranceLoan,
	defaultInterestLoan,
	defaultTaxLoan,
	defaultUnauthorizedLoan,
	extendedFounded,
	loanAssets,
	loanAverage,
	loanConsult,
	loanPaidAverageDays,
	loanProduct,
	newLoansFounded,
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

const getNewLoansFounded = async (days: string) => {
	const response = await authApiClient.get<{
		loanQuantity: number;
		loanAverage: number;
		averageInterestRate: number | null;
		defaultLoans: Array<Loan>;
		averageLTV: number | null;
		averageLoanAmount: number | null;
	}>(newLoansFounded(days));
	return response.data;
};

const getExtendedFounded = async (days: string) => {
	const response = await authApiClient.get<{
		loanQuantity: number;
		loanAverage: number;
		averageInterestRate: number | null;
		defaultLoans: Array<Loan>;
		averageLTV: number | null;
		averageLoanAmount: number | null;
	}>(extendedFounded(days));
	return response.data;
};

const getPaidOffLoans = async (days: string) => {
	const response = await authApiClient.get<{
		paid: { quantity: number | null };
		averageInterestRate: number | null;
		defaultLoans: Array<Loan>;
		averageLTV: number | null;
		averageLoanAmount: number | null;
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

const getAllDefaultInterestLoan = async () => {
	const response = await authApiClient.get<{
		totalCredit: string;
		totalDebit: string;
		loans: any;
	}>(allDefaultInterestLoan());
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
	getNewLoansFounded,
	getExtendedFounded,
	getAllDefaultInterestLoan,
};

export default ManageReportsService;
