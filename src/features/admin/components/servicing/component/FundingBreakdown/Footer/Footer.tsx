import { type ComponentType } from "react";
import { Cell } from "@/components/table/Cell";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import { ParticipationBreakdown } from "@/types/api/participation-breakdown";

interface Props {
	data: (FundingBreakdown | ParticipationBreakdown)[];
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = data.reduce(
		(accumulator, { amount, prorated, rate, regular }) => {
			accumulator.amount += Number(amount);
			accumulator.prorated += Number(prorated);
			accumulator.rate += Number(rate);
			accumulator.regular += Number(regular);

			return accumulator;
		},
		{
			amount: 0,
			prorated: 0,
			rate: 0,
			regular: 0,
		}
	);

	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-5 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell format="money" value={totals.amount} bold />
				<Cell format="percentage" value={totals.rate} bold />
				<Cell format="money" value={totals.prorated} bold />
				<Cell format="money" value={totals.regular} bold />
			</div>
		</div>
	);
};
