/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { addInvestorBankFields } from "../../utils/input-fields";
import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { Select } from "@/components/forms/Select";
import type { AddInvestorBankFields } from "../../types/validations";

interface InvestorBankInfoProps {
	showInvestorBankInfo?: boolean;
	handleInvestorBankInfo?: (data: AddInvestorBankFields) => void;
	handleSuccess?: (data: AddInvestorBankFields) => void;
	data?: AddInvestorBankFields;
	buttonText?: string;
}

const OPTIONS = [
	{ name: "Saving", code: "Saving" },
	{ name: "Checking", code: "Checking" },
];

export const InvestorBankInfo: React.FC<InvestorBankInfoProps> = ({
	showInvestorBankInfo,
	handleInvestorBankInfo,
	data,
	buttonText,
	handleSuccess,
}) => {
	const { register, handleSubmit, watch, setValue } = useForm<FieldValues>();

	useEffect(() => {
		if (data) {
			setValue(
				addInvestorBankFields?.bankingName || "bankingName",
				data?.bankingName
			);
			setValue(
				addInvestorBankFields.accountNumber || "accountNumber",
				data?.accountNumber
			);
			setValue(
				addInvestorBankFields.routingNumber || "routingNumber",
				data?.routingNumber
			);
			setValue(
				addInvestorBankFields.accountType || "accountType",
				data?.accountType
			);
		}
	}, []);

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: SubmitHandler<FieldValues> = (data: any): void => {
		if (handleSuccess) {
			handleSuccess(data);
		}
		console.log(data);
	};

	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex flex-col gap-5 w-full h-full">
				<div className="flex justify-between gap-2 w-full h-full ">
					<div className="w-full h-full">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full h-full flex flex-col justify-between"
						>
							<div className="flex  flex-col justify-between w-full  gap-6">
								<Input
									label="Banking Name"
									placeholder="Banking Name"
									register={register(addInvestorBankFields?.bankingName)}
								/>

								<Input
									label="Routing Number"
									placeholder="Enter Routing Number"
									register={register(addInvestorBankFields?.routingNumber)}
								/>

								<Input
									label="Account Number"
									placeholder="EnterAccount Number"
									register={register(addInvestorBankFields?.accountNumber)}
								/>

								<Select
									register={register(addInvestorBankFields?.accountType)}
									className="flex flex-col gap-2"
									label="Account Type"
									placeholder="Select Dropdown"
									options={OPTIONS}
									value={data?.accountType}
								/>
								<div className="flex flex-col gap-1">
									<Button text={buttonText} className={`bg-primary-500`} />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			{showInvestorBankInfo && (
				<div
					onClick={(): void => {
						if (handleInvestorBankInfo) {
							const data = {
								bankingName: watch(addInvestorBankFields?.bankingName),
								routingNumber: watch(addInvestorBankFields?.routingNumber),
								accountNumber: watch(addInvestorBankFields?.accountNumber),
								accountType: watch(addInvestorBankFields?.accountType),
							};

							handleInvestorBankInfo(data);
						}
					}}
					className="absolute w-8 h-8 text-gray-1200 border-0 bg-gray-200 rounded-full transition duration-200  flex items-center justify-center cursor-pointer"
					style={{ right: "65px", top: "24px" }}
				>
					<Icon name="arrowLeft" width="14" color="#6c757d" />
				</div>
			)}
		</div>
	);
};
