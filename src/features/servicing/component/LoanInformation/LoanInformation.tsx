import type { FC } from "react";
import { LoanCard } from "../LoanCard";
export const LoanInformation: FC = () => {
	return (
		<div
			className={` flex  w-full h-full  gap-2 text-gray-1000  justify-center p-[5px] rounded-[16px]`}
		>
			<div className="w-[33.33%] h-full">
				<div className="mb-10">
					<LoanCard title="Loan Type" text="Fix and Flip" />

					<LoanCard
						title="Collateral Address"
						text="Collateral Address"
						background
					/>
				</div>

				<div>
					<LoanCard title="Loan Type" text="Fix and Flip" />

					<LoanCard
						title="Collateral Address"
						text="Collateral Address"
						background
					/>
				</div>
			</div>

			<div className="w-[33.33%] ">
				<LoanCard title="Collateral Address" text="Collateral Address" />
			</div>

			<div className="w-[33.33%]">
				<LoanCard title="Loan Type" text="Fix and Flip" />
			</div>
		</div>
	);
};
