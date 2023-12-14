import { Cell } from "@/components/table/Cell";
import type { ComponentType } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Investor } from "@/types/api/investor";
import { getFooterData } from "@/utils/investors.ts";
import moment from "moment";

interface Props extends ExpanderComponentProps<Investor> {
	selectedParticipation?: FundingBreakdown;
	selectParticipation?: (row: FundingBreakdown) => void;
}

export const ExpandedComponent: ComponentType<Props> = ({
	data,
	selectedParticipation,
	selectParticipation,
}) => {
	const totals = getFooterData(data.participationBreakdowns || []);

	return (
		<>
			{data.participationBreakdowns?.map((participant) => (
				<div
					key={participant.id}
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
							value={`LLC  ${participant.loan.collaterals?.[0]?.address || ""}

              `}
							bold
						/>
						<Cell
							format="money"
							value={participant.loan?.totalLoanAmount || ""}
							bold
						/>
						<Cell
							format="money"
							value={Number(participant.loan.totalLoanAmount) * 0.99}
							bold
						/>
						<Cell format="percentage" value={participant.rate} bold />
						<Cell format="money" value={participant.regular} bold />
						<Cell
							format="text"
							value={participant.loan.originationDate?.toString() || ""}
							bold
						/>
						<Cell
							format="text"
							value={participant.loan.maturityDate?.toString() || ""}
							bold
						/>
						<Cell
							className={
								selectedParticipation?.id === participant.id
									? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
									: "bg-gold-500/[12%] text-gold-500"
							}
							format="money"
							value={`${
								moment(participant.loan.originationDate).toDate().getMonth() ===
								new Date().getMonth()
									? Number(participant.prorated)
									: Number(participant.regular || 0)
							}`}
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
					<Cell format="money" value={totals.totalLoanAmount * 0.99} bold />
					<Cell format="percentage" value={totals.rate} bold />
					<Cell format="money" value={totals.regular} bold />
					<Cell format="text" value="--" bold />
					<Cell format="text" value="--" bold />
					<Cell
						className="bg-gold-500/[12%] text-gold-500"
						format="money"
						value={totals.current}
						bold
					/>
				</div>
			</div>
		</>
	);
};
