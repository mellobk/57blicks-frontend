/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Cell } from "@/components/table/Cell";
import { useState, type ComponentType, useEffect } from "react";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Investor } from "@/types/api/investor";
import {
	type FooterDataInvestor,
	getFooterData,
	getFooterDataLlc,
} from "@/utils/investors.ts";
import { useMutation } from "@tanstack/react-query";
import LoansService from "@/api/loans";
import { Modal } from "@/components/ui/Modal";
import { FundingBreakdown as FundingComponent } from "../../../../servicing/component/FundingBreakdown/FundingBreakdown";
import { Icon } from "@/components/ui/Icon";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
/* import {
	getIsSameMonthYear,
	getIsSamePreviousMonthYear,
} from "@/utils/common-functions"; */
import { formatDate, moneyFormat } from "@/utils/formats";
import moment from "moment";

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
	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const beforeCurrentMonth = moment().subtract(1, "month").month();
	const fundingBreakdowns = data.lender?.fundingBreakdowns ?? [];
	const participationBreakdowns = data.participationBreakdowns ?? [];

	const totals = getFooterData(
		[
			...participationBreakdowns,
			...fundingBreakdowns,
		] as Array<FooterDataInvestor>,
		data?.id || "0"
	);

	const totalsLlc = getFooterDataLlc([
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

	/* 	const currentValue = (
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
	}; */

	const currentValuePayableInvestorById = (
		participant: ParticipationBreakdown,
		investorId: string
	) => {
		let data = "0";

		const findMonth = participant?.loan?.payables?.find((data) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);
			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === beforeCurrentMonth
			);
		});

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find(
					(data) => data.type === "Investor" && data.investor.id === investorId
				).credit) ||
			participant.regular;

		if (participant.loan.status === "DEFAULT") {
			data = String((Number(participant.amount) * 18) / 100 / 12);
		}
		return moneyFormat(Number.parseFloat(data || "0"));
	};

	const nextValuePayableInvestorById = (
		participant: ParticipationBreakdown,
		investorId: string
	) => {
		let data = "0";

		const findMonth = participant?.loan?.payables?.find((data) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);
			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === currentDate.month()
			);
		});

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find(
					(data) => data.type === "Investor" && data.investor.id === investorId
				).credit) ||
			participant.regular;

		if (participant.loan.status === "DEFAULT") {
			data = String((Number(participant.amount) * 18) / 100 / 12);
		}
		return moneyFormat(Number.parseFloat(data || "0"));
	};

	const currentValuePayableInvestor = (participant: ParticipationBreakdown) => {
		let data = "0";

		const findMonth = participant?.loan?.payables?.find((data) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);
			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === beforeCurrentMonth
			);
		});

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find((data) => data.type === "Lender")
					.credit) ||
			participant.regular;

		if (participant.loan.status === "DEFAULT") {
			data = String((Number(participant.amount) * 18) / 100 / 12);
		}
		return moneyFormat(Number.parseFloat(data || "0"));
	};

	const nextValuePayableInvestor = (participant: ParticipationBreakdown) => {
		let data = "0";

		const findMonth = participant?.loan?.payables?.find((data) => {
			// Extract the month and year from the date string
			const dataMonth = moment(data["month"], dateFormat);
			// Check if year and month are the same as the current date
			return (
				dataMonth.year() === currentDate.year() &&
				dataMonth.month() === currentDate.month()
			);
		});

		data =
			(findMonth &&
				findMonth["payableDetails"]?.find((data) => data.type === "Lender")
					.credit) ||
			participant.regular;

		if (participant.loan.status === "DEFAULT") {
			data = String((Number(participant.amount) * 18) / 100 / 12);
		}
		return moneyFormat(Number.parseFloat(data || "0"));
	};

	/* 	const previousValue = (
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
	}; */

	return (
		<>
			{data.participationBreakdowns?.map((participant, index) => (
				<div className="relative">
					<div
						key={participant.id + index}
						className={`  flex flex-row h-12 ${
							selectedParticipation?.id === participant.id
								? "bg-blue-200/[15%]"
								: "bg-white"
						} relative z-0`}
						onClick={() => selectParticipation?.(participant)}
					>
						<div className="w-12" />
						<div className="flex w-full items-center relative z-0 ">
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
								value={participant.loan?.principal || ""}
								bold
							/>
							<Cell format="money" value={Number(participant.amount)} bold />
							<Cell format="percentage" value={participant.rate} bold />
							<Cell format="money" value={participant.regular} bold />
							<Cell
								format="text"
								value={formatDate(
									participant.loan.originationDate?.toString() || ""
								)}
								bold
							/>
							<Cell
								format="text"
								value={formatDate(
									participant.loan.maturityDate?.toString() || ""
								)}
								bold
							/>
							<Cell
								className={
									selectedParticipation?.id === participant.id
										? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
										: "bg-gold-500/[12%] text-gold-500"
								}
								format="text"
								value={currentValuePayableInvestorById(
									participant as any,
									data.id
								)}
								bold
							/>
							<Cell
								className={
									selectedParticipation?.id === participant.id
										? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
										: "bg-gold-500/[12%] text-gold-500"
								}
								format="text"
								value={nextValuePayableInvestorById(
									participant as any,
									data.id
								)}
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
						className={`flex flex-row h-12 mt-[10px] mb-[10px] ${
							selectedParticipation?.id === participant.id
								? "bg-blue-200/[15%]"
								: "bg-white"
						} relative z-0`}
						onClick={() => {
							selectParticipation?.(participant as ParticipationBreakdown);
						}}
					>
						<div className="w-12 " />
						<div className="flex w-full items-center relative z-0  ">
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
								className=""
								value={`${
									participant.loan?.borrower?.llc ||
									`${participant.loan?.borrower?.user?.firstName} ${participant.loan?.borrower?.user?.lastName}`
								}  / ${participant.loan?.borrower?.user.mailingAddress}`}
								bold
							/>
							<Cell
								format="money"
								value={participant.loan?.principal || ""}
								bold
							/>
							<Cell format="money" value={Number(participant.amount)} bold />
							<Cell format="percentage" value={participant.rate} bold />
							<Cell format="text" value={participant.regular} bold />
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
								value={currentValuePayableInvestor(participant as any)}
								bold
							/>
							<Cell
								className={
									selectedParticipation?.id === participant.id
										? "bg-blue-200/[24%] text-blue-200 border-2 border-blue-200"
										: "bg-gold-500/[12%] text-gold-500"
								}
								format="text"
								value={nextValuePayableInvestor(participant as any)}
								bold
							/>
						</div>
					</div>
				</div>
			))}

			{data.lender?.fundingBreakdowns.length ? (
				<div className="flex flex-row h-12 bg-gray-200">
					<div className="w-12" />
					<div className="grid grid-cols-9 w-full items-center">
						<Cell format="text" value="Subtotal" bold />
						<Cell format="money" value={totalsLlc.totalLoanAmount} bold />
						<Cell format="money" value={totalsLlc.amount} bold />
						<Cell format="percentage" value={totalsLlc.rate} bold />
						<Cell format="money" value={totalsLlc.regular} bold />
						<Cell format="text" value="--" bold />
						<Cell format="text" value="--" bold />
						<Cell
							className="bg-gold-500/[12%] text-gold-500"
							format="money"
							value={totalsLlc.previous}
							bold
						/>
						<Cell
							className="bg-gold-500/[12%] text-gold-500"
							format="money"
							value={totalsLlc.current}
							bold
						/>
					</div>
				</div>
			) : (
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
			)}
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
