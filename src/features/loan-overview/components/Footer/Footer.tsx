import { ComponentType } from "react";
import { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import { Cell } from "@/components/table/Cell";
import { LoanOverviewFields } from "@/features/loan-overview/types/fields";

interface Props extends ExpanderComponentProps<any> {
	data: LoanOverviewFields;
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
		data.fundingBreakdown?.reduce((acc, fundingBreakdown) => {
			acc.dueToDraws += fundingBreakdown.dueToDraws;
			acc.total++;
			acc.totalDrawn += fundingBreakdown.totalDrawn;
			acc.totalFunds += fundingBreakdown.totalFunds;
			acc.totalLoan += fundingBreakdown.totalLoan;
			acc.trustAllocated += fundingBreakdown.trustAllocated;
			acc.trustUnallocated += fundingBreakdown.trustUnallocated;
			return acc;
		}, totals) || totals;

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="grid grid-cols-7 gap-8 px-4 w-full items-center">
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
