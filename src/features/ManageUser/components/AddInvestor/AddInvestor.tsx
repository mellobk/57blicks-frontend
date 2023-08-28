/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { InvestorInfo } from "../InvestorInfo/InvestorInfo";
import type {
	AddInvestorBankFields,
	AddInvestorFields,
} from "../../types/validations";
import { InvestorBankInfo } from "../InvestorBankInfo/InvestorBankInfo";

export const AddInvestor: React.FC = () => {
	const [investorInfo, setInvestorInfo] = useState<AddInvestorFields>();
	const [investorBankInfo, setInvestorBankInfo] =
		useState<AddInvestorBankFields>();
	const [showInvestorBankInfo, setShowInvestorBankInfo] =
		useState<boolean>(false);
	const handleInvestorInfo = (data: AddInvestorFields): void => {
		setShowInvestorBankInfo(!showInvestorBankInfo);
		setInvestorInfo(data);
	};

	const handleInvestorBankInfo = (data: AddInvestorBankFields): void => {
		setInvestorBankInfo(data);
		setShowInvestorBankInfo(!showInvestorBankInfo);
	};
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex flex-col gap-5 w-full h-full">
				<div className="flex justify-between gap-2 w-full h-full ">
					<div className="w-full h-full">
						{!showInvestorBankInfo && (
							<InvestorInfo
								handleInvestorInfo={handleInvestorInfo}
								data={investorInfo}
							/>
						)}
						{showInvestorBankInfo && (
							<InvestorBankInfo
								showInvestorBankInfo
								handleInvestorBankInfo={handleInvestorBankInfo}
								data={investorBankInfo}
								buttonText="Send Invite"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
