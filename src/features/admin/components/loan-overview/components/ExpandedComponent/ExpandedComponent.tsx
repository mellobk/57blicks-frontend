import type { ComponentType } from "react";
import type { Control } from "react-hook-form";
import { Cell } from "@/components/table/Cell";
import { CellInput } from "@/components/table/CellInput";
import type { IInvestorOverview, ILoanOverview } from "../../types/fields";

interface Props {
	control: Control<ILoanOverview>;
	data: IInvestorOverview;
}

export const ExpandedComponent: ComponentType<Props> = ({ control, data }) => {
	return (
		<>
			{data.participants?.map((investor) => (
				<div className="flex flex-row h-12 bg-white">
					<div className="w-12" />
					<div className="grid grid-cols-7 w-full items-center">
						<Cell format="text" value={investor.name} />
						<Cell format="money" value={investor.totalLoan} />
						<Cell format="money" value={investor.totalDrawnToDate} />
						<CellInput
							control={control}
							format="money"
							name="trustUnallocated"
						/>
						<Cell format="money" value={investor.trustAllocated} />
						<Cell format="money" value={investor.dueToDraws} />
						<Cell format="money" value={investor.totalFunds} />
					</div>
				</div>
			))}
		</>
	);
};
