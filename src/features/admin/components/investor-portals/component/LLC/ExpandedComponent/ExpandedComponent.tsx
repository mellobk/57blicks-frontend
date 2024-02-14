/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Cell } from "@/components/table/Cell";
import { useState, type ComponentType, useEffect } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Investor } from "@/types/api/investor";
import { type FooterDataInvestor, getFooterData } from "@/utils/investors.ts";
import { useMutation } from "@tanstack/react-query";
import LoansService from "@/api/loans";
import { Modal } from "@/components/ui/Modal";
import { FundingBreakdown as FundingComponent } from "../../../../servicing/component/FundingBreakdown/FundingBreakdown";
import { Icon } from "@/components/ui/Icon";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import {
	getIsSameMonthYear,
	getIsSamePreviousMonthYear,
} from "@/utils/common-functions";
import { moneyFormat } from "@/utils/formats";

interface Props extends ExpanderComponentProps<Investor> {
	selectedParticipation?: FundingBreakdown;
	selectParticipation?: (
		row: FundingBreakdown | ParticipationBreakdown
	) => void;
}

// import type { FundingBreakdown } from "@/types/api/funding-breakdown";
// import type { Loan } from "@/types/api/loan";
// import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";

export const ExpandedComponent: ComponentType<Props> = ({
	data,
	selectedParticipation,
	selectParticipation,
}) => {
	const fundingBreakdowns = data.lender?.fundingBreakdowns ?? [];
	const participationBreakdowns = data.participationBreakdowns ?? [];
	const totals = getFooterData([
		...participationBreakdowns,
		...fundingBreakdowns,
	] as Array<FooterDataInvestor>);

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

	const currentValue = (
		originationDate: string,
		prorated: string,
		regular: string,
		status: string,
		amount: string
	) => {
		let data = getIsSameMonthYear(originationDate as unknown as string)
			? prorated
			: regular;

		if (status === "DEFAULT") {
			data = String((Number(amount) * 18) / 100 / 12);
		}
		return moneyFormat(Number.parseFloat(data || "0"));
	};

	const previousValue = (
		originationDate: string,
		prorated: string,
		regular: string
	) => {
		const data = getIsSamePreviousMonthYear(
			originationDate as unknown as string
		);
		let value = "0";
		if (data === 0) {
			value = prorated || "0";
		} else if (data === -1) {
			value = regular || "0";
		}

		return moneyFormat(Number.parseFloat(value));
	};

	return (
		<>
			{data.participationBreakdowns?.map((participant, index) => (
				<div className="relative">
					<div
						key={participant.id + index}
						className={`flex flex-row h-12 ${
							selectedParticipation?.id === participant.id
								? "bg-blue-200/[15%]"
								: "bg-white"
						} relative z-0`}
						onClick={() => selectParticipation?.(participant)}
					>
						<div className="w-12" />
						<div className="grid grid-cols-9 w-full items-center relative z-0">
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
								value={`${
									participant.loan?.borrower?.llc ||
									`${participant.loan?.borrower?.user?.firstName} ${participant.loan?.borrower?.user?.lastName}`
								}  / ${participant.loan?.borrower?.user.mailingAddress}`}
								bold
							/>
							<Cell
								format="money"
								value={participant.loan?.totalLoanAmount || ""}
								bold
							/>
							<Cell format="money" value={Number(participant.amount)} bold />
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
								format="text"
								value={`${previousValue(
									participant.loan.originationDate as unknown as string,
									participant.prorated,
									participant.regular
								)}`}
								bold
							/>
							<Cell
								className={
									selectedParticipation?.id === participant.id
										? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
										: "bg-gold-500/[12%] text-gold-500"
								}
								format="text"
								value={`${currentValue(
									participant.loan.originationDate as unknown as string,
									participant.prorated,
									participant.regular,
									participant.loan.status,
									participant.amount
								)}`}
								bold
							/>
						</div>
					</div>
				</div>
			))}

			{data.lender?.fundingBreakdowns?.map((participant) => (
				<div className="relative">
					<div
						key={participant.id}
						className={`flex flex-row h-12 ${
							selectedParticipation?.id === participant.id
								? "bg-blue-200/[15%]"
								: "bg-white"
						} relative z-0`}
						onClick={() => {
							console.log("🚀 ~ participant:", participant);
							selectParticipation?.(participant as ParticipationBreakdown);
						}}
					>
						<div className="w-12" />
						<div className="grid grid-cols-9 w-full items-center relative z-0">
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
								value={`LLC  ${
									participant.loan.collaterals?.[0]?.address || ""
								}`}
								bold
							/>
							<Cell
								format="money"
								value={participant.loan?.totalLoanAmount || ""}
								bold
							/>
							<Cell format="money" value={Number(participant.amount)} bold />
							<Cell format="percentage" value={participant.rate} bold />
							<Cell
								format="text"
								value={`${currentValue(
									participant.loan.originationDate as unknown as string,
									participant.prorated,
									participant.regular,
									participant.loan.status,
									participant.amount
								)}`}
								bold
							/>
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
								className="bg-gold-500/[12%] text-gold-500"
								format="text"
								value={`${previousValue(
									participant.loan.originationDate as unknown as string,
									participant.prorated,
									participant.regular
								)}`}
								bold
							/>
							<Cell
								className={
									selectedParticipation?.id === participant.id
										? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
										: "bg-gold-500/[12%] text-gold-500"
								}
								format="text"
								value={`${currentValue(
									participant.loan.originationDate as unknown as string,
									participant.prorated,
									participant.regular,
									participant.loan.status,
									participant.amount
								)}`}
								bold
							/>
						</div>
					</div>
				</div>
			))}

			<div className="flex flex-row h-12 bg-gray-200">
				<div className="w-12" />
				<div className="grid grid-cols-9 w-full items-center">
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
