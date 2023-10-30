import type { ComponentType } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import { Cell } from "@/components/table/Cell";
import type { FundingBreakdown } from "@/features/admin/components/loan-overview/types/fields.ts";

interface Props extends ExpanderComponentProps<any> {
	data: Array<FundingBreakdown>;
}

export const Footer: ComponentType<Props> = ({ data }) => {
	let totals = {
		dueToDraws: 0,
		total: 0,
		totalDrawn: 0,
		totalFunds: 0,
		totalLoan: 0,
		trustAllocated: 0,
		trustUnallocated: 0,
	};
	totals =
		data?.reduce((accumulator, fundingBreakdown) => {
			accumulator.dueToDraws += Number(fundingBreakdown.dueToDraws);
			accumulator.total++;
			accumulator.totalDrawn += Number(fundingBreakdown.totalDrawn);
			accumulator.totalFunds += Number(fundingBreakdown.totalFunds);
			accumulator.totalLoan += Number(fundingBreakdown.totalLoan);
			accumulator.trustAllocated += Number(fundingBreakdown.trustAllocated);
			accumulator.trustUnallocated += Number(fundingBreakdown.trustUnallocated);
			return accumulator;
		}, totals) || totals;

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="grid grid-cols-7 w-full items-center">
				<Cell format="text" value={`Total: ${totals.total}`} bold />
				<Cell format="money" value={totals.totalLoan} bold />
				<Cell format="money" value={totals.totalDrawn} bold />
				<Cell format="money" value={totals.trustUnallocated} bold />
				<Cell format="money" value={totals.trustAllocated} bold />
				<Cell format="money" value={totals.dueToDraws} bold />
				<Cell format="money" value={totals.totalFunds} bold />
			</div>
		</div>
	);
};
