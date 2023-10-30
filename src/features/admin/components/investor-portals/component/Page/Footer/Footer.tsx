import { type ComponentType, useEffect, useState } from "react";

import { Cell } from "@/components/table/Cell";
import { FundingBreakdown } from "@/types/api/funding-breakdown.ts";

interface Props {
	data: FundingBreakdown[];
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const defaultTotals = {
		amount: 0,
		rate: 0,
		regular: 0,
		totalLoanAmount: 0,
	};
	const [totals, setTotals] = useState(defaultTotals);

	useEffect(() => {
		const newTotals = data.reduce(
			(accumulator, { amount, loan, rate, regular }) => {
				accumulator.amount += Number(amount);
				accumulator.rate += Number(rate);
				accumulator.regular += Number(regular);
				accumulator.totalLoanAmount += Number(loan.totalLoanAmount);

				return accumulator;
			},
			defaultTotals
		);

		setTotals(newTotals);
	}, [data]);

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-8 w-full items-center">
				<Cell format="text" value={`Total: ${data.length}`} bold />
				<Cell format="money" value={totals.totalLoanAmount} bold />
				<Cell format="money" value={totals.amount} bold />
				<Cell format="percentage" value={totals.rate} bold />
				<Cell format="money" value={totals.regular} bold />
				<Cell format="text" value="--" bold />
				<Cell format="text" value="--" bold />
				<Cell
					className="bg-gold-500/[12%] text-gold-500"
					format="money"
					value={totals.regular}
					bold
				/>
			</div>
		</div>
	);
};
