import type { ComponentType } from "react";
import type { Control } from "react-hook-form";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import { Cell } from "@/components/table/Cell";
import { CellInput } from "@/components/table/CellInput";
import type {
	FundingBreakdown,
	LoanOverviewFields,
} from "@/features/admin/components/loan-overview/types/fields.ts";

interface Props extends ExpanderComponentProps<FundingBreakdown> {
	control: Control<LoanOverviewFields>;
}

export const ExpandedComponent: ComponentType<Props> = ({ control, data }) => {
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
		data.participants?.reduce((accumulator, participant) => {
			accumulator.dueToDraws += Number(participant.dueToDraws);
			accumulator.totalDrawn += Number(participant.totalDrawn);
			accumulator.totalFunds += Number(participant.totalFunds);
			accumulator.totalLoan += Number(participant.totalLoan);
			accumulator.trustAllocated += Number(participant.trustAllocated);
			accumulator.trustUnallocated += Number(participant.trustUnallocated);
			return accumulator;
		}, subtotals) || subtotals;

	return (
		<>
			{data.participants?.length && (
				<>
					{data.participants?.map((participant) => (
						<div className="flex flex-row h-12 bg-white">
							<div className="w-12" />
							<div className="grid grid-cols-7 w-full items-center">
								<Cell format="text" value={participant.lender} />
								<Cell format="money" value={participant.totalLoan} />
								<Cell format="money" value={participant.totalDrawn} />
								<CellInput
									control={control}
									format="money"
									name="trustUnallocated"
								/>
								<CellInput
									control={control}
									format="money"
									name="trustAllocated"
								/>
								<Cell format="money" value={participant.dueToDraws} />
								<Cell format="money" value={participant.totalFunds} />
							</div>
						</div>
					))}

					<div className="flex flex-row h-12 bg-gray-200">
						<div className="w-12" />
						<div className="grid grid-cols-7 w-full items-center">
							<Cell format="text" value={subtotals.lender} bold />
							<Cell format="money" value={subtotals.totalLoan} bold />
							<Cell format="money" value={subtotals.totalDrawn} bold />
							<Cell format="money" value={subtotals.trustUnallocated} bold />
							<Cell format="money" value={subtotals.trustAllocated} bold />
							<Cell format="money" value={subtotals.dueToDraws} bold />
							<Cell format="money" value={subtotals.totalFunds} bold />
						</div>
					</div>
				</>
			)}
		</>
	);
};
