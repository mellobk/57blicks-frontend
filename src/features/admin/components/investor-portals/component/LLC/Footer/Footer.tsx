import { type ComponentType } from "react";

import { Cell } from "@/components/table/Cell";
import { Loan } from "@/types/api/loan";
import moment from "moment";

interface Props {
	data: Loan[];
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = data.reduce(
		(accumulator, { participationBreakdowns }) => {
			participationBreakdowns?.forEach(({ rate, regular, loan, prorated }) => {
				accumulator.rate += Number(rate);
				accumulator.regular += Number(regular);
				accumulator.totalLoanAmount += Number(loan.totalLoanAmount);
				accumulator.current += Number(
					moment(loan.originationDate).toDate().getMonth() ===
						new Date().getMonth()
						? Number(prorated)
						: Number(regular || 0)
				);
			});

			return accumulator;
		},
		{
			rate: 0,
			regular: 0,
			totalLoanAmount: 0,
			current: 0,
		}
	);

	return (
		<div className="flex flex-row min-h-12 h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="grid grid-cols-8 w-full items-center">
				<Cell format="text" value={`Total: ${data.length}`} bold />
				<Cell format="money" value={totals.totalLoanAmount} bold />
				<Cell format="money" value={totals.totalLoanAmount * 0.99} bold />
				<Cell format="percentage" value={totals.rate} bold />
				<Cell format="money" value={totals.regular} bold />
				<Cell format="text" value="--" bold />
				<Cell format="text" value="--" bold />
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
