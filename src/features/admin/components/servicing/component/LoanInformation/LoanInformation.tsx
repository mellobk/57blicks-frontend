import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanCollateralCard } from "../LoanCollateralCard";
import type { Collateral, FundingBreakdown } from "../../types/api";
import { formatDate, moneyFormat } from "@/utils/formats";

interface LoanInformationProps {
	data?: FundingBreakdown;
}

export const LoanInformation: FC<LoanInformationProps> = ({ data }) => {
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
					background
				/>

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
					return <LoanCollateralCard key={data.id} data={data} />;
				})}
			</div>
		</div>
	);
};
