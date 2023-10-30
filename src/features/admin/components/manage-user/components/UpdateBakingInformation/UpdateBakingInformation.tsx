import { type FC, useEffect, useState } from "react";
import type { AddInvestorBankFields } from "../../types/fields.ts";
import { InvestorBankInfo } from "../InvestorBankInfo/InvestorBankInfo.tsx";
import { Success } from "../Success";
import type { Investor } from "../../types/api.ts";
import ManageUsersService from "../../api/investors.ts";
import { useMutation } from "@tanstack/react-query";

interface UpdateBakingInformationProps {
	handleClick?: () => void;
	data?: Investor;
	id?: string;
}

export const UpdateBakingInformation: FC<UpdateBakingInformationProps> = ({
	handleClick,
	data,
	id,
}) => {
	const [investorBankInfo, setInvestorBankInfo] = useState<any>(data);
	const [showInvestorBankInfo, setShowInvestorBankInfo] =
		useState<boolean>(false);

	const investorMutation = useMutation((data: Investor) => {
		return ManageUsersService.updateInvestorsBank(data);
	});

	useEffect(() => {
		if (investorMutation.isSuccess) {
			setShowInvestorBankInfo(true);
		}
	}, [investorMutation]);

	const handleInvestorBankInfo = (data: AddInvestorBankFields): void => {
		setInvestorBankInfo(data);
		investorMutation.mutate({
			id: id,
			...data,
		});
	};

	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex flex-col gap-5 w-full h-full">
				<div className="flex justify-between gap-2 w-full h-full ">
					<div className="w-full h-full">
						{showInvestorBankInfo ? (
							<div className="w-full">
								<Success
									handleClick={handleClick}
									buttonText="Ok"
									subTitle="Bank Information has been updated successfully."
								/>
							</div>
						) : (
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
