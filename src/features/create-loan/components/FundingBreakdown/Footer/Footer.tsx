import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { Cell } from "@/components/table/Cell";
import { Loan } from "@/features/create-loan/types/fields";
import { Control, useWatch } from "react-hook-form";

interface Props {
	calculateProrated: (
		amount: string,
		rate: string,
		originationDate: string
	) => string;
	calculateRegular: (amount: string, rate: string) => string;
	control: Control<Loan>;
}

export const Footer: ComponentType<Props> = ({
	calculateProrated,
	calculateRegular,
	control,
}) => {
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
			(acc, { amount, rate }) => {
				acc.amount += Number(amount);
				acc.prorated += Number(
					calculateProrated(amount, rate, originationDate)
				);
				acc.rate += Number(rate);
				acc.regular += Number(calculateRegular(amount, rate));

				return acc;
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
						totals.amount !== Number(totalLoanAmount)
							? "text-red-ERROR"
							: "text-primary-300"
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
