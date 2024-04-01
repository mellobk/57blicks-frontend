/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Investor } from "@/types/api/investor";
import type { Loan } from "@/types/api/loan";
import type { Payable } from "@/features/admin/components/servicing/component/Payable/types";
/* import { getIsSamePreviousMonthYear } from "./common-functions"; */
import moment from "moment/moment";
import { moneyFormat } from "@/utils/formats";
/* import { ParticipationBreakdown } from "@/types/api/participation-breakdown"; */
export interface ColumInvestorPayable {
	borrower: string;
	loanId: string;
	january: number;
	february: number;
	march: number;
	april: number;
	may: number;
	june: number;
	july: number;
	august: number;
	september: number;
	october: number;
	november: number;
	december: number;
	total: number;
}

export const getLoanColumnsInvestor = () => {
	const loanColumns = [];
	const months = moment.months();

	loanColumns.push({
		name: "Borrower",
		selector: (row: ColumInvestorPayable) => row.borrower,
		sortable: true,
		width: "150px",
	});

	for (const month of months) {
		loanColumns.push({
			name: month,
			selector: (row: ColumInvestorPayable) =>
				moneyFormat(
					Number(row[month.toLowerCase() as keyof ColumInvestorPayable])
				),

			conditionalCellStyles: [
				{
					when: () => month === moment().format("MMMM"),
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		});
	}

	loanColumns.push({
		name: "Annual Total",
		selector: (row: ColumInvestorPayable) => moneyFormat(Number(row.total)),
		conditionalCellStyles: [
			{
				when: (row: ColumInvestorPayable) => !!row.total,
				style: {
					background: "#0085FF1F",
					color: "#0085FF",
				},
			},
		],
	});

	return loanColumns;
};

export const getLoanColumns = () => {
	const loanColumns = [];
	const months = moment.months();

	for (const month of months) {
		loanColumns.push({
			name: month,
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
			conditionalCellStyles: [
				{
					when: () => month === moment().format("MMMM"),
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		});
	}

	loanColumns.push({
		name: "Annual Total",
		selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular) * 12),
		conditionalCellStyles: [
			{
				when: (row: FundingBreakdown) => !!row.regular,
				style: {
					background: "#0085FF1F",
					color: "#0085FF",
				},
			},
		],
	});

	return loanColumns;
};

export interface FooterDataInvestor {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	lenderName: string;
	amount: string;
	rate: string;
	prorated: string;
	regular: string;
	investor: Investor;
	loan: Loan;
	type: "Investor" | "YieldSpread" | "Lender" | "Servicing";
}

export const getFooterData = (
	data: Array<FooterDataInvestor>,
	id: string = "0"
) => {
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const beforeCurrentMonth = moment().subtract(1, "month").month();
	const currentValuePayableInvestor = (loan: Loan, invertorId: string) => {
		let data = "0";
		const findMonth = loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === beforeCurrentMonth
				);
			}
		);

		data =
			findMonth?.payableDetails?.find(
				(payableData: { investor: any; type: string }) => {
					return (
						payableData.type === "Investor" &&
						payableData?.investor?.id === invertorId
					);
				}
			)?.credit || "0";

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}
		return Number.parseFloat(data);
	};

	const nextValuePayableInvestor = (loan: Loan, invertorId: string) => {
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
			findMonth?.payableDetails?.find(
				(payableData: { investor: any; type: string }) => {
					return (
						payableData.type === "Investor" &&
						payableData?.investor?.id === invertorId
					);
				}
			)?.credit || "0";

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}

		return Number.parseFloat(data);
	};

	return data.reduce(
		(accumulator, { loan, rate, regular, amount }) => {
			accumulator.rate += Number(rate);
			accumulator.regular += Number(regular);
			accumulator.totalLoanAmount += Number(loan.principal);
			accumulator.amount += Number(amount);

			accumulator.current += Number(
				nextValuePayableInvestor(loan, id || "") || regular
			);

			accumulator.previous += Number(
				currentValuePayableInvestor(loan, id || "") || regular
			);

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			totalLoanAmount: 0,
			amount: 0,
			current: 0,
			previous: 0,
		}
	);
};

export const getFooterDataLender = (data: Array<FooterDataInvestor>) => {
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const beforeCurrentMonth = moment().subtract(1, "month").month();
	const currentValuePayableInvestor = (loan: Loan) => {
		let data = "0";
		const findMonth = loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === beforeCurrentMonth
				);
			}
		);

		data =
			findMonth?.payableDetails?.find(
				(payableData: { investor: any; type: string }) => {
					return payableData.type === "Lender";
				}
			)?.credit || "0";

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}
		return Number.parseFloat(data);
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
					dataMonth.month() === currentDate.month()
				);
			}
		);

		data =
			findMonth?.payableDetails?.find(
				(payableData: { investor: any; type: string }) => {
					return payableData.type === "Lender";
				}
			)?.credit || "0";

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}

		return Number.parseFloat(data);
	};

	return data.reduce(
		(accumulator, { loan, rate, regular, amount }) => {
			accumulator.rate += Number(rate);
			accumulator.regular += Number(regular);
			accumulator.totalLoanAmount += Number(loan.principal);
			accumulator.amount += Number(amount);

			accumulator.current += Number(nextValuePayableInvestor(loan) || regular);

			accumulator.previous += Number(
				currentValuePayableInvestor(loan) || regular
			);

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			totalLoanAmount: 0,
			amount: 0,
			current: 0,
			previous: 0,
		}
	);
};

export const getFooterDataLlc = (data: Array<FooterDataInvestor>) => {
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const beforeCurrentMonth = moment().subtract(1, "month").month();
	const currentValuePayableInvestor = (loan: Loan) => {
		let data = "0";
		const findMonth = loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === beforeCurrentMonth
				);
			}
		);

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find(
					(data: { investor: any; type: string }) => data.type === "Lender"
				)?.credit) ||
			0;

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}
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
					dataMonth.month() === currentDate.month()
				);
			}
		);

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find(
					(data: { investor: any; type: string }) => data.type === "Lender"
				)?.credit) ||
			0;

		if (loan.status === "DEFAULT") {
			data = /* String((Number(loan.principal) * 18) / 100 / 12) */ "0";
		}
		return Number.parseFloat(data || "0");
	};

	return data.reduce(
		(accumulator, { loan, rate, regular, amount }) => {
			accumulator.rate += Number(rate);
			accumulator.regular += Number(regular);
			accumulator.totalLoanAmount += Number(loan.principal);
			accumulator.amount += Number(amount);

			accumulator.current += Number(nextValuePayableInvestor(loan) || regular);

			accumulator.previous += Number(
				currentValuePayableInvestor(loan) || regular
			);

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			totalLoanAmount: 0,
			amount: 0,
			current: 0,
			previous: 0,
		}
	);
};

export const fillDataLoansPayables = (
	payables: Array<Payable>,
	loan: Array<Loan>
): Array<ColumInvestorPayable> => {
	const data: Array<ColumInvestorPayable> = [];
	loan?.forEach((item) => {
		data.push({
			borrower: item.borrower?.llc || "",
			loanId: item.id || "",
			january: 0,
			february: 0,
			march: 0,
			april: 0,
			may: 0,
			june: 0,
			july: 0,
			august: 0,
			september: 0,
			october: 0,
			november: 0,
			december: 0,
			total: 0,
		});
	});

	payables.forEach((payable) => {
		//get the mont in test moment
		const mont = moment(payable.month).format("MMMM").toLocaleLowerCase();
		const value: number =
			(payable.payableDetails
				? payable.payableDetails[0]?.credit
				: undefined) || 0;
		//get the index of the month
		const index = data.findIndex((item) => {
			return String(item.loanId) === String(payable.loan?.id);
		});

		try {
			const key = mont as keyof ColumInvestorPayable;
			data[index]![key] = value as never;
		} catch {
			/* empty */
		}
	});

	//sum all rows in the array and set the total
	data.forEach((item) => {
		let total = 0;
		for (const key in item) {
			if (key !== "loanId" && key !== "borrower") {
				total += Number(item[key as keyof ColumInvestorPayable]) || 0;
			}
		}

		item.total = total;
	});

	return data;
};
