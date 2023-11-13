import { type ComponentType } from "react";
import { Cell } from "@/components/table/Cell";

interface Props {
	disabled: boolean;
	totals: {
		amount: number;
		constructionHoldback: number;
		prorated: number;
		rate: number;
		regular: number;
	};
}

export const Footer: ComponentType<Props> = ({ disabled, totals }) => {
	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-6 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell
					className={disabled ? "text-red-ERROR" : "text-primary-300"}
					format="money"
					value={totals.amount}
					bold
				/>
				<Cell format="text" value="--" bold />
				<Cell format="money" value={totals.prorated} bold />
				<Cell format="money" value={totals.regular} bold />
				<Cell format="money" value={totals.constructionHoldback} bold />
			</div>
			<div className="w-12" />
		</div>
	);
};
