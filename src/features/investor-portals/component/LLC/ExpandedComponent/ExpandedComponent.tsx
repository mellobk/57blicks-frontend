import { ComponentType, useEffect, useState } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";

import { Cell } from "@/components/table/Cell";
import { FundingBreakdown } from "@/types/api/funding-breakdown.ts";
import { Investor } from "@/types/api/investor.ts";

interface Props extends ExpanderComponentProps<Investor> {
	selectedParticipation?: FundingBreakdown;
	selectParticipation?: (row: FundingBreakdown) => void;
}

export const ExpandedComponent: ComponentType<Props> = ({
	data,
	selectedParticipation,
	selectParticipation,
}) => {
	const defaultTotals = {
		amount: 0,
		rate: 0,
		regular: 0,
		totalLoanAmount: 0,
	};
	const [totals, setTotals] = useState(defaultTotals);

	useEffect(() => {
		const newTotals = data.participationBreakdowns?.reduce(
			(accumulator, { amount, loan, rate, regular }) => {
				accumulator.amount += Number(amount);
				accumulator.rate += Number(rate);
				accumulator.regular += Number(regular);
				accumulator.totalLoanAmount += Number(loan.totalLoanAmount);

				return accumulator;
			},
			defaultTotals
		);

		setTotals(newTotals || defaultTotals);
	}, [data]);

	return (
		<>
			{data.participationBreakdowns?.length && (
				<>
					{data.participationBreakdowns?.map((participant) => (
						<div
							className={`flex flex-row h-12 ${
								selectedParticipation?.id === participant.id
									? "bg-blue-200/[15%]"
									: "bg-white"
							}`}
							onClick={() => selectParticipation?.(participant)}
						>
							<div className="w-12" />
							<div className="grid grid-cols-8 w-full items-center">
								<Cell
									format="text"
									value={`LLC / ${
										participant.loan.collaterals?.[0]?.address || ""
									}`}
									bold
								/>
								<Cell
									format="money"
									value={participant.loan.totalLoanAmount}
									bold
								/>
								<Cell format="money" value={participant.amount} bold />
								<Cell format="percentage" value={participant.rate} bold />
								<Cell format="money" value={participant.regular} bold />
								<Cell
									format="text"
									value={participant.loan.originationDate.toString() || ""}
									bold
								/>
								<Cell
									format="text"
									value={participant.loan.maturityDate.toString() || ""}
									bold
								/>
								<Cell
									className={
										selectedParticipation?.id === participant.id
											? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
											: "bg-gold-500/[12%] text-gold-500"
									}
									format="money"
									value={participant.regular}
									bold
								/>
							</div>
						</div>
					))}

					<div className="flex flex-row h-12 bg-gray-200">
						<div className="w-12" />
						<div className="grid grid-cols-8 w-full items-center">
							<Cell format="text" value="Subtotal" bold />
							<Cell format="money" value={totals.totalLoanAmount} bold />
							<Cell format="money" value={totals.amount} bold />
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
				</>
			)}
		</>
	);
};
