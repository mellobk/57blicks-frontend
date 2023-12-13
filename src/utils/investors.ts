import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import moment from "moment/moment";
import { moneyFormat } from "@/utils/formats";

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
		width: "120px",
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

export const getFooterData = (
	data: Array<FundingBreakdown | ParticipationBreakdown>
) => {
	return data.reduce(
		(accumulator, { loan, rate, regular }) => {
			accumulator.rate += Number(rate);
			accumulator.regular += Number(regular);
			accumulator.totalLoanAmount += Number(loan.totalLoanAmount);

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			totalLoanAmount: 0,
		}
	);
};
