import type { ComponentType } from "react";
import { Cell } from "@/components/table/Cell";
import type { IParticipantOverview } from "../../types/fields";

interface Props {
	data: Array<IParticipantOverview>;
}

export const Footer: ComponentType<Props> = ({ data }) => {
	let totals = {
		dueToDraws: 0,
		total: 0,
		totalDrawn: 0,
		totalFunds: 0,
		totalLoans: 0,
		trustAllocated: 0,
		trustUnallocated: 0,
	};
	totals =
		data?.reduce((accumulator, fundingBreakdown) => {
			accumulator.dueToDraws += Number(fundingBreakdown.dueToDraws);
			accumulator.total++;
			accumulator.totalDrawn += Number(fundingBreakdown.totalDrawnToDate);
			accumulator.totalFunds += Number(fundingBreakdown.totalFunds);
			accumulator.totalLoans += Number(fundingBreakdown.totalLoans);
			accumulator.trustAllocated += Number(fundingBreakdown.trustAllocated);
			accumulator.trustUnallocated += Number(fundingBreakdown.trustUnallocated);
			return accumulator;
		}, totals) || totals;

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="grid grid-cols-7 w-full items-center">
				<Cell format="text" value={`Total: ${totals.total}`} bold />
				<Cell format="money" value={totals.totalLoans} bold />
				<Cell format="money" value={totals.totalDrawn} bold />
				<Cell format="money" value={totals.trustUnallocated} bold />
				<Cell format="money" value={totals.trustAllocated} bold />
				<Cell format="money" value={totals.dueToDraws} bold />
				<Cell format="money" value={totals.totalFunds} bold />
			</div>
		</div>
	);
};
