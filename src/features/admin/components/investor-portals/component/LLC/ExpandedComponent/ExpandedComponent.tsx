import { Cell } from "@/components/table/Cell";
import { useState, type ComponentType, useEffect } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Investor } from "@/types/api/investor";
import { getFooterData } from "@/utils/investors.ts";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import LoansService from "@/api/loans";
import { Modal } from "@/components/ui/Modal";
import { FundingBreakdown as FundingComponent } from "../../../../servicing/component/FundingBreakdown/FundingBreakdown";
import { Icon } from "@/components/ui/Icon";

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

	const [openDecline, setOpenDecline] = useState<boolean>();
	const [idLoan, setIdLoan] = useState<string>("");
	const approvalQuery = useMutation(async (id: string) => {
		return LoansService.getLoan(id || "");
	});
	useEffect(() => {
		if (idLoan) {
			approvalQuery.mutate(idLoan);
		}
	}, [idLoan]);

	return (
		<>
			{data.participationBreakdowns?.map((participant) => (
				<div className="relative">
					<div
						key={participant.id}
						className={`flex flex-row h-12 ${
							selectedParticipation?.id === participant.id
								? "bg-blue-200/[15%]"
								: "bg-white"
						} relative z-0`}
						onClick={() => selectParticipation?.(participant)}
					>
						<div className="w-12" />
						<div className="grid grid-cols-8 w-full items-center relative z-0">
							<div
								className="cursor-pointer absolute left-[-30px] "
								onClick={() => {
									setOpenDecline(true);
									setIdLoan(participant.loan.id || "");
								}}
							>
								<Icon name="chart" width="20" color="black" />
							</div>
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
									moment(participant.loan.originationDate)
										.toDate()
										.getMonth() === new Date().getMonth()
										? Number(participant.prorated)
										: Number(participant.regular || 0)
								}`}
								bold
							/>
						</div>
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
			<Modal
				visible={openDecline}
				onHide={() => {
					setOpenDecline(false);
				}}
				title={`Funding BreakDown`}
				width="95%"
				minHeight="90vh"
			>
				<FundingComponent data={approvalQuery.data} />
			</Modal>
		</>
	);
};
