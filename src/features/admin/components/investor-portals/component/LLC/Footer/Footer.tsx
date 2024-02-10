import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { Loan } from "@/types/api/loan";
import { getIsSamePreviousMonthYear } from "@/utils/common-functions";
import moment from "moment";

interface Props {
	data: Array<Loan>;
}

const previousValue = (
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
};

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = data.reduce(
		(accumulator, { participationBreakdowns, lender }) => {
			const fundingBreakdowns = lender?.fundingBreakdowns ?? [];
			const participationBreakdownsArray = participationBreakdowns ?? [];

			[...participationBreakdownsArray, ...fundingBreakdowns]?.forEach(
				({ rate, regular, loan, prorated, amount }) => {
					accumulator.rate += Number(rate);
					accumulator.regular += Number(regular);
					accumulator.totalLoanAmount += Number(loan.totalLoanAmount);
					accumulator.amount += Number(amount);
					accumulator.current += Number(
						moment(loan.originationDate).toDate().getMonth() ===
							new Date().getMonth()
							? Number(prorated)
							: Number(regular || 0)
					);

					accumulator.previous += previousValue(
						loan.originationDate as unknown as string,
						prorated,
						regular
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
