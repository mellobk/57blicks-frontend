import type { FC } from "react";
import { LoanCard } from "../LoanCard";
import { LoanCollateralCard } from "../LoanCollateralCard";
export const LoanInformation: FC = () => {
	return (
		<div
			className={` flex  w-full h-full  gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px] max-h-[750px] overflow-hidden`}
		>
			<div className="w-[33.33%]  border-r border-gray-200 pr-4">
				<div className="mb-10 flex gap-2 flex-col">
					<LoanCard title="Loan Type" text="Fix and Flip" />

					<LoanCard
						title="Collateral Address"
						text="Collateral Address"
						background
					/>
				</div>

				<div className="flex gap-2 flex-col">
					<LoanCard title="Total Loan Amount" text="$100,000.00" />

					<LoanCard title="Interest Rate" text="12%" background />

					<LoanCard title="Prepayment Penalty" text="0%, (90 Days)" />

					<LoanCard
						title="Insurance Expiration Date"
						text="12-12-2023"
						background
					/>
				</div>
			</div>

			<div className="w-[33.33%] flex gap-2 flex-col ">
				<LoanCard title="Origination Date" text="12-12-2023" />

				<LoanCard title="Maturity Date" text="12-12-2023" background />

				<LoanCard title="Construction Holdback" text="$0.00" />

				<LoanCard title="Amount Drawn" text="$0.00" background />
				<LoanCard title="Asset Class" text="Asset Class" />
			</div>

			<div className="w-[33.33%]  flex gap-2 flex-col overflow-auto border-l border-gray-200 pl-3.5 ">
				<LoanCollateralCard />

				<LoanCollateralCard />
			</div>
		</div>
	);
};
