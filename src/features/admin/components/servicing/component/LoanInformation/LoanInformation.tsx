import type { Collateral, FundingBreakdown } from "../../types/api";
import { formatDate, moneyFormat } from "@/utils/formats";

import { Button } from "@/components/ui/Button";
import ExtendLoan from "./ExtendLoan";
import { useState, type FC } from "react";
import { LEAD_SOURCES } from "../../../create-loan/utils/selects";
import { LoanCard } from "../LoanCard";
import { LoanCollateralCard } from "../LoanCollateralCard";

interface LoanInformationProps {
	data?: FundingBreakdown;
	handleRefreshData?: () => void;
}

export const LoanInformation: FC<LoanInformationProps> = ({
	data,
	handleRefreshData,
}) => {
	const [save, setSave] = useState(true);
	const [submit, setSubmit] = useState(false);

	return (
		<div
			className={` flex  w-full   gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden`}
			style={{ height: "80vh !important" }}
		>
			<div className="w-[33.33%]  border-r border-gray-200 pr-4">
				<div className="mb-10 flex gap-2 flex-col">
					<LoanCard title="Loan Type" text={data?.loan?.type} />
				</div>

				<div className="flex gap-2 flex-col">
					<LoanCard
						title="Total Loan Amount"
						text={moneyFormat(
							Number.parseInt(data?.loan?.totalLoanAmount || "")
						)}
					/>

					<LoanCard
						title="Interest Rate"
						text={`${data?.loan?.interestRate}%`}
						background
					/>

					<LoanCard
						title="Prepayment Penalty"
						text={data?.loan?.prepaymentPenalty}
					/>

					<LoanCard
						title="Loan Consultant"
						text={data?.loan.loanConsultant}
						background
					/>

					<LoanCard
						title="Lead Origin"
						text={
							LEAD_SOURCES.find(
								(dataSource) => dataSource.code === data?.loan.leadSource
							)?.name
						}
					/>
				</div>
			</div>

			<div className="w-[33.33%] flex gap-2 flex-col ">
				<LoanCard
					title="Origination Date"
					text={formatDate(data?.loan?.originationDate.toString() || "")}
				/>

				<LoanCard
					title="Maturity Date"
					text={formatDate(data?.loan?.maturityDate.toString() || "")}
					className="relative"
					background
				>
					{data?.loan && (
						<ExtendLoan
							handleRefreshData={handleRefreshData}
							loan={data?.loan}
							handleEdit={(): void => {
								setSave(false);
								setSubmit(false);
							}}
							submit={submit}
						/>
					)}
				</LoanCard>

				<LoanCard
					title="Construction Holdback"
					text={moneyFormat(
						Number.parseInt(data?.loan?.constructionHoldback || "")
					)}
				/>

				<LoanCard
					title="Amount Drawn"
					text={moneyFormat(Number.parseInt(data?.loan?.amountDrawn || ""))}
					background
				/>

				<LoanCard
					title="LTV"
					text={`${Number.parseFloat(data?.loan?.ltv.toString() || "").toFixed(
						0
					)}%`}
					background
				/>
			</div>

			<div className="w-[33.33%]  flex gap-2 flex-col overflow-auto border-l border-gray-200 pl-3.5 ">
				{data?.loan?.collaterals.map((data: Collateral) => {
					return (
						<LoanCollateralCard
							key={data.id}
							data={data}
							handleRefreshData={handleRefreshData}
						/>
					);
				})}
			</div>

			<Button
				buttonText="Save"
				variant={"gray"}
				disabled={save}
				className="absolute top-[25px] right-[148px] py-[3px] px-[10px] bg-gray-250 text-white rounded-3xl"
				onClick={(): void => {
					//setSave(true);
					setSubmit(true);
				}}
			/>
		</div>
	);
};
