import type { ComponentType } from "react";

import { Cell } from "@/components/table/Cell";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import {
	type FooterDataInvestor,
	getFooterDataLender,
} from "@/utils/investors";

interface Props {
	data: Array<FundingBreakdown>;
}

export const Footer: ComponentType<Props> = ({ data }) => {
	const totals = getFooterDataLender(
		data as unknown as Array<FooterDataInvestor>
	);

	return (
		<div className="flex flex-row min-h-12 h-12 bg-gray-200 rounded-b-2xl">
			<div className="w-12" />
			<div className="flex w-full items-center">
				<Cell
					format="text"
					value={`Total: ${data.length}`}
					bold
					className="w-[201%]"
				/>
				<Cell format="money" value={totals.totalLoanAmount} bold />
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
