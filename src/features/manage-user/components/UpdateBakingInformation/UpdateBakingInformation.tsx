/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import type { AddInvestorBankFields } from "../../types/validations";
import { InvestorBankInfo } from "../InvestorBankInfo/InvestorBankInfo";
import { Success } from "../Success";
import type { Investor } from "../../types/api";

interface UpdateBakingInformationProps {
	handleClick?: () => void;
	data?: Investor;
}

export const UpdateBakingInformation: React.FC<
	UpdateBakingInformationProps
> = ({ handleClick, data }) => {
	console.log(data?.accountType, "update bank");
	const [investorBankInfo, setInvestorBankInfo] = useState<any>(data);
	const [showInvestorBankInfo, setShowInvestorBankInfo] =
		useState<boolean>(false);

	const handleInvestorBankInfo = (data: AddInvestorBankFields): void => {
		setInvestorBankInfo(data);
		setShowInvestorBankInfo(!showInvestorBankInfo);
	};

	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex flex-col gap-5 w-full h-full">
				<div className="flex justify-between gap-2 w-full h-full ">
					<div className="w-full h-full">
						{showInvestorBankInfo && (
							<div className="w-full">
								<Success
									handleClick={handleClick}
									buttonText="ok"
									subTitle="Bank Information has been updated successfully."
								/>
							</div>
						)}
						{!showInvestorBankInfo && (
							<InvestorBankInfo
								handleSuccess={handleInvestorBankInfo}
								data={investorBankInfo}
								buttonText="Save Changes"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
