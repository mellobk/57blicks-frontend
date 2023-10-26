import { type ComponentType, useEffect, useState } from "react";
import { type Control, useWatch } from "react-hook-form";
import { Cell } from "@/components/table/Cell";
import type { Loan } from "@/features/create-loan/types/fields";
import {
	calculateProrated,
	calculateRegular,
} from "@/utils/common-funtions.ts";

interface Props {
	control: Control<Loan>;
}

export const Footer: ComponentType<Props> = ({ control }) => {
	const defaultTotals = {
		amount: 0,
		prorated: 0,
		rate: 0,
		regular: 0,
	};
	const [totals, setTotals] = useState(defaultTotals);
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

	useEffect(() => {
		const newTotals = [...fundingBreakdown, ...participationBreakdown].reduce(
			(accumulator, { amount, rate }) => {
				accumulator.amount += Number(amount);
				accumulator.prorated += Number(
					calculateProrated(amount, rate, originationDate)
				);
				accumulator.rate += Number(rate);
				accumulator.regular += Number(calculateRegular(amount, rate));

				return accumulator;
			},
			defaultTotals
		);

		setTotals(newTotals);
	}, [fundingBreakdown, participationBreakdown]);

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
