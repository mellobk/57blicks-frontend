/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import { InvestorInfo } from "../InvestorInfo/InvestorInfo";
import type {
	AddInvestorBankFields,
	AddInvestorFields,
} from "../../types/fields";
import { InvestorBankInfo } from "../InvestorBankInfo/InvestorBankInfo";
import { unFormatPhone } from "@/utils/common-funtions.ts";
import { useMutation } from "@tanstack/react-query";
import ManageUsersService from "../../api/investors";
import type { Investor } from "../../types/api";

interface AddInvestorProps {
	handleSuccess?: () => void;
}

export const AddInvestor: React.FC<AddInvestorProps> = ({ handleSuccess }) => {
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
		setShowInvestorBankInfo(false);
	};

	const createInvestorMutation = useMutation((data: Investor) => {
		return ManageUsersService.createNewInvestor(data);
	});

	const handleSendInvitation = (data: AddInvestorBankFields): void => {
		const phoneNumber = unFormatPhone(investorInfo?.phoneNumber || "");

		const formatData = {
			ssnEin: investorInfo?.einSsn,
			streetAddress: investorInfo?.streetAddress,
			zip: investorInfo?.zip,
			bankingName: data?.bankingName,
			routingNumber: data?.routingNumber,
			accountNumber: data?.accountNumber,
			accountType: data?.accountType,
			user: {
				firstName: investorInfo?.firstName,
				lastName: investorInfo?.lastName,
				entityName: investorInfo?.entityName,
				email: investorInfo?.email,
				companyName: "",
				phoneNumber: `+1${phoneNumber}`,
				mailingAddress: "Mailing Address",
			},
		};

		createInvestorMutation.mutate({
			...formatData,
		});
	};

	useEffect(() => {
		if (createInvestorMutation.isSuccess) {
			handleSuccess?.();
		}
		if (createInvestorMutation.isError) {
			createInvestorMutation.reset();
		}
	}, [createInvestorMutation]);

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
								loading={createInvestorMutation.isLoading}
								showInvestorBankInfo
								handleInvestorBankInfo={handleInvestorBankInfo}
								handleSuccess={handleSendInvitation}
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
