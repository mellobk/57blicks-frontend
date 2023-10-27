import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanCollateralCard } from "../LoanCollateralCard";
import type { Collateral, Loan } from "@/features/servicing/types/api";
import { moneyFormat } from "@/utils/formats";

interface LoanInformationProps {
	data?: Loan | any;
}

export const LoanInformation: FC<LoanInformationProps> = ({ data }) => {
	return (
		<div
			className={` flex  w-full   gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden`}
			style={{ height: "80vh !important" }}
		>
			<div className="w-[33.33%]  border-r border-gray-200 pr-4 opacity-40">
				<div className="mb-20 flex gap-2 flex-col">
					<LoanCard title="Loan Type" text={data?.type} />

					<LoanCard
						title="Collateral Address"
						text={data?.collaterals[0]?.address}
						background
					/>
				</div>

				<div className="flex gap-2 flex-col">
					<LoanCard
						title="Total Loan Amount"
						text={moneyFormat(Number.parseInt(data?.totalLoanAmount || ""))}
					/>

					<LoanCard
						title="Interest Rate"
						text={`${data?.interestRate}%`}
						background
					/>

					<LoanCard title="Prepayment Penalty" text={data?.prepaymentPenalty} />

					<LoanCard
						title="Insurance Expiration Date"
						text={data?.collaterals[0]?.insuranceExpirationDate.toString()}
						background
					/>
				</div>
			</div>

			<div className="w-[33.33%] flex gap-2 flex-col  opacity-40">
				<LoanCard
					title="Origination Date"
					text={data?.originationDate.toString()}
				/>

				<LoanCard
					title="Maturity Date"
					text={data?.maturityDate.toString()}
					background
				/>

				<LoanCard
					title="Construction Holdback"
					text={moneyFormat(Number.parseInt(data?.constructionHoldback || ""))}
				/>

				<LoanCard
					title="Amount Drawn"
					text={moneyFormat(Number.parseInt(data?.amountDrawn || ""))}
					background
				/>
				<LoanCard title="Asset Class" text={data?.collaterals[0]?.assetType} />

				<LoanCard title="LTV" text={`${data?.ltv}%`} background />
			</div>

			<div className="w-[33.33%]  flex gap-2 flex-col overflow-auto border-l border-gray-200 pl-3.5  opacity-40">
				{data?.collaterals.map((data: Collateral) => {
					return <LoanCollateralCard key={data.id} data={data} />;
				})}
			</div>
		</div>
	);
};
