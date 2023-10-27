import moment from "moment";

import { FundingBreakdown } from "@/types/api/funding-breakdown";
import { moneyFormat } from "@/utils/formats.ts";

export const getLoanColumns = () => {
	const loanColumns = [];
	const months = moment.months();

	for (let month of months) {
		loanColumns.push({
			name: month,
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
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