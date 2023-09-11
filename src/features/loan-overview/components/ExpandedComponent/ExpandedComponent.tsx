import { ComponentType } from "react";
import { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import { Cell } from "@/features/loan-overview/components/Cell/Cell";
import { CellInput } from "@/features/loan-overview/components/CellInput/CellInput";
import { FundingBreakdown } from "@/features/loan-overview/types/fields";

interface Props extends ExpanderComponentProps<any> {
	data: FundingBreakdown;
}

export const ExpandedComponent: ComponentType<Props> = ({ data }) => {
	let subtotals = {
		dueToDraws: 0,
		lender: "Subtotals",
		totalDrawn: 0,
		totalFunds: 0,
		totalLoan: 0,
		trustAllocated: 0,
		trustUnallocated: 0,
	};
	subtotals =
		data.participants?.reduce((acc, participant) => {
			acc.dueToDraws += participant.dueToDraws;
			acc.totalDrawn += participant.totalDrawn;
			acc.totalFunds += participant.totalFunds;
			acc.totalLoan += participant.totalLoan;
			acc.trustAllocated += participant.trustAllocated;
			acc.trustUnallocated += participant.trustUnallocated;
			return acc;
		}, subtotals) || subtotals;

	return (
		<>
			{data.participants?.length && (
				<>
					{data.participants?.map((participant) => (
						<div className="flex flex-row h-12 bg-gold-500/[.06]">
							<div className="w-12" />
							<div className="grid grid-cols-7 gap-8 px-4 w-full items-center">
								<Cell type="text" value={participant.lender} />
								<Cell type="number" value={participant.totalLoan} />
								<Cell type="number" value={participant.totalDrawn} />
								<CellInput value={participant.trustUnallocated} gold />
								<CellInput value={participant.trustAllocated} gold />
								<Cell type="number" value={participant.dueToDraws} />
								<Cell type="number" value={participant.totalFunds} />
							</div>
						</div>
					))}

					<div className="flex flex-row h-12 bg-gold-500/[.06]">
						<div className="w-12" />
						<div className="grid grid-cols-7 gap-8 px-4 w-full items-center">
							<Cell type="text" value={subtotals.lender} bold />
							<Cell type="number" value={subtotals.totalLoan} bold />
							<Cell type="number" value={subtotals.totalDrawn} bold />
							<Cell type="number" value={subtotals.trustUnallocated} bold />
							<Cell type="number" value={subtotals.trustAllocated} bold />
							<Cell type="number" value={subtotals.dueToDraws} bold />
							<Cell type="number" value={subtotals.totalFunds} bold />
						</div>
					</div>
				</>
			)}
		</>
	);
};
