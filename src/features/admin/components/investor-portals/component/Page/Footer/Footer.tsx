import type { ComponentType } from "react";

import { Cell } from "@/components/table/Cell";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import { type FooterDataInvestor, getFooterData } from "@/utils/investors";

interface Props {
	data: Array<FundingBreakdown>;
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = getFooterData(data as unknown as Array<FooterDataInvestor>);

	return (
		<div className="flex flex-row h-12 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-7 w-full items-center">
				<Cell format="text" value={`Total: ${data.length}`} bold />
				<Cell format="money" value={totals.totalLoanAmount} bold />
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
