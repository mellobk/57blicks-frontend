/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { Loan } from "@/types/api/loan";
/* import { getIsSamePreviousMonthYear } from "@/utils/common-functions"; */
import moment from "moment";

interface Props {
	data: Array<Loan>;
}

/* const previousValue = (
	originationDate: string,
	prorated: string,
	regular: string
) => {
	const data = getIsSamePreviousMonthYear(originationDate as unknown as string);
	let value = "0";
	if (data === 0) {
		value = prorated || "0";
	} else if (data === -1) {
		value = regular || "0";
	}

	return Number.parseFloat(value);
}; */

export const Footer: ComponentType<Props> = ({ data }) => {
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const nextCurrentDate = moment(); // Current date
	const nexMonthDate = nextCurrentDate.add(1, "month").month();

	const currentValuePayableInvestor = (loan: Loan) => {
		let data = "0";
		const findMonth = loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === currentDate.month()
				);
			}
		);

		data =
			findMonth &&
			findMonth["payableDetails"]?.find(
				(data: { type: string }) =>
					data.type === "Lender" || data.type === "Investor"
			).credit;

		if (loan.status === "DEFAULT") {
			data = String((Number(loan.principal) * 18) / 100 / 12);
		}
		console.log(data);
		return Number.parseFloat(data || "0");
	};

	const nextValuePayableInvestor = (loan: Loan) => {
		let data = "0";
		const findMonth = loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === nexMonthDate
				);
			}
		);

		data =
			findMonth &&
			findMonth["payableDetails"]?.find(
				(data: { type: string }) =>
					data.type === "Lender" || data.type === "Investor"
			).credit;

		if (loan.status === "DEFAULT") {
			data = String((Number(loan.principal) * 18) / 100 / 12);
		}
		console.log(data);
		return Number.parseFloat(data || "0");
	};
	const totals = data.reduce(
		(accumulator, { participationBreakdowns, lender }) => {
			const fundingBreakdowns = lender?.fundingBreakdowns ?? [];
			const participationBreakdownsArray = participationBreakdowns ?? [];

			[...participationBreakdownsArray, ...fundingBreakdowns]?.forEach(
				({ rate, regular, loan, amount, prorated }) => {
					accumulator.rate += Number(rate);
					accumulator.regular += Number(regular);
					accumulator.totalLoanAmount += Number(loan.principal);
					accumulator.amount += Number(amount);
					accumulator.previous += Number(
						currentValuePayableInvestor(loan as any) || prorated
					);
					accumulator.current += Number(
						nextValuePayableInvestor(loan as any) ||
							currentValuePayableInvestor(loan as any) ||
							prorated
					);
				}
			);

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			amount: 0,
			totalLoanAmount: 0,
			current: 0,
			previous: 0,
		}
	);

	return (
		<div className="flex flex-row min-h-12 h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="grid grid-cols-9 w-full items-center">
				<Cell format="text" value={`Total: ${data.length}`} bold />
				<Cell format="money" value={totals.totalLoanAmount} bold />
				<Cell format="money" value={totals.amount} bold />
				<Cell format="text" value={""} bold />
				<Cell format="money" value={totals.regular} bold />
				<Cell format="text" value="--" bold />
				<Cell format="text" value="--" bold />
				<Cell
					className="bg-gold-500/[12%] text-gold-500"
					format="money"
					value={totals.previous}
					bold
				/>
				<Cell
					className="bg-gold-500/[12%] text-gold-500"
					format="money"
					value={totals.current}
					bold
				/>
			</div>
		</div>
	);
};
