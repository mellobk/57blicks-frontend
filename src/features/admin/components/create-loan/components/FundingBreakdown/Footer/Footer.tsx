import { type ComponentType } from "react";
import { type Control, useWatch } from "react-hook-form";
import { Cell } from "@/components/table/Cell";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { calculateProrated, calculateRegular } from "@/utils/common-funtions";

interface Props {
	control: Control<Loan>;
}

export const Footer: ComponentType<Props> = ({ control }) => {
	const [
		fundingBreakdown,
		originationDate,
		participationBreakdown,
		totalLoanAmount,
	] = useWatch({
		control,
		name: [
			"fundingBreakdown",
			"originationDate",
			"participationBreakdown",
			"totalLoanAmount",
		],
	});

	const totals = [fundingBreakdown[0], ...participationBreakdown].reduce(
		(accumulator, row) => {
			if (row) {
				accumulator.amount += Number(row.amount);
				accumulator.prorated += Number(
					calculateProrated(row.amount, row.rate, originationDate)
				);
				accumulator.rate += Number(row.rate);
				accumulator.regular += Number(calculateRegular(row.amount, row.rate));
			}

			return accumulator;
		},
		{
			amount: 0,
			prorated: 0,
			rate: 0,
			regular: 0,
		}
	);

	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-5 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell
					className={
						totals.amount === Number(totalLoanAmount)
							? "text-primary-300"
							: "text-red-ERROR"
					}
					format="money"
					value={totals.amount}
					bold
				/>
				<Cell format="percentage" value={totals.rate} bold />
				<Cell format="money" value={totals.prorated} bold />
				<Cell format="money" value={totals.regular} bold />
			</div>
			<div className="w-12" />
		</div>
	);
};
