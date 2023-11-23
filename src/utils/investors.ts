import { FundingBreakdown } from "@/types/api/funding-breakdown";
import { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import moment from "moment/moment";
import { moneyFormat } from "@/utils/formats";

export const getLoanColumns = () => {
	const loanColumns = [];
	const months = moment.months();

	for (let month of months) {
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
	data: (FundingBreakdown | ParticipationBreakdown)[]
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
