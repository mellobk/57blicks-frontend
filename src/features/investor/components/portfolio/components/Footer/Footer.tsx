import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import { getFooterData } from "@/utils/investors";

interface Props {
	data: Array<ParticipationBreakdown>;
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = getFooterData(data);

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
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
					value={totals.regular}
					bold
				/>
			</div>
		</div>
	);
};
