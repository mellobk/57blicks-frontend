import type { FC } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAdminSchema } from "@/features/manage-user/schemas/AddAdminSchemas";
import { Input } from "@/components/forms/Input";
import { useForm } from "react-hook-form";
import {
	addAdminFields,
	addInvestorBankFields,
} from "@/features/manage-user/utils/input-fields";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/forms/Select";
import { ACCOUNT_OPTIONS } from "@/features/manage-user/utils/constant";
import type { AddInvestorBankFields } from "@/features/manage-user/types/fields";
import { MaskInput } from "@/components/forms/MaskInput";

interface InvestorBankInfoProps {
	data?: AddInvestorBankFields;
}

export const BorrowerInformation: FC<InvestorBankInfoProps> = ({ data }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(AddAdminSchema),
	});

	const onSubmit: SubmitHandler<FieldValues> = (data: any): void => {
		console.log(data);
	};

	return (
		<div
			className={` flex  w-full h-full  gap-5 text-gray-1000  justify-center p-[5px] rounded-[16px]  overflow-hidden mt-9`}
		>
			<div className="w-full h-full">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full h-full flex  justify-between gap-7"
				>
					<div className="w-[60%]  border border-gray-200 p-4 rounded-3xl gap-6 flex flex-col ">
						<div className="text-[28px] text-black">Borrower Information</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="Borrower LLC"
									placeholder="Enter Borrower LLC"
									register={register(addAdminFields?.firstName)}
									error={
										errors?.[addAdminFields?.firstName] &&
										errors?.[addAdminFields?.firstName]?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="EIN/SSN"
									placeholder="Enter EIN/SSN"
									register={register(addAdminFields?.lastName)}
									error={
										errors?.[addAdminFields?.lastName] &&
										errors?.[addAdminFields?.lastName]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="First Name"
									placeholder="Enter First Name"
									register={register(addAdminFields?.firstName)}
									error={
										errors?.[addAdminFields?.firstName] &&
										errors?.[addAdminFields?.firstName]?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="Last Name"
									placeholder="Enter Last Name"
									register={register(addAdminFields?.lastName)}
									error={
										errors?.[addAdminFields?.lastName] &&
										errors?.[addAdminFields?.lastName]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<MaskInput
									mask="(999) 999-9999"
									label="Phone Number"
									placeholder="Enter Phone Number"
									register={register(addAdminFields?.firstName)}
									error={
										errors?.[addAdminFields?.firstName] &&
										errors?.[addAdminFields?.firstName]?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="Email Address"
									placeholder="Enter Email Address"
									register={register(addAdminFields?.lastName)}
									error={
										errors?.[addAdminFields?.lastName] &&
										errors?.[addAdminFields?.lastName]?.message
									}
								/>
							</div>
						</div>
						<div className="flex w-full gap-4">
							<div className="w-full">
								<Input
									label="Mailing Address"
									placeholder="Enter Mailing Address"
									register={register(addAdminFields?.firstName)}
									error={
										errors?.[addAdminFields?.firstName] &&
										errors?.[addAdminFields?.firstName]?.message
									}
								/>
							</div>
							<div className="w-full">
								<Input
									label="LTV"
									placeholder="Enter LTV"
									register={register(addAdminFields?.lastName)}
									error={
										errors?.[addAdminFields?.lastName] &&
										errors?.[addAdminFields?.lastName]?.message
									}
								/>
							</div>
						</div>
					</div>

					<div className="w-[40%]  flex gap-6 flex-col overflow-auto border border-gray-200 p-4 rounded-3xl ">
						<div className="text-[28px] text-black">Banking Information</div>
						<Input
							label="Banking Name"
							placeholder="Banking Name"
							register={register(addInvestorBankFields?.bankingName)}
						/>

						<Input
							label="Routing Number"
							type="number"
							placeholder="Enter Routing Number"
							register={register(addInvestorBankFields?.routingNumber)}
						/>

						<Input
							label="Account Number"
							type="number"
							placeholder="EnterAccount Number"
							register={register(addInvestorBankFields?.accountNumber)}
						/>

						<Select
							register={register(addInvestorBankFields?.accountType)}
							className="flex flex-col gap-2"
							label="Account Type"
							placeholder="Select Account Type"
							value={{
								name: data?.accountType || "",
								code: data?.accountType || "",
							}}
							options={ACCOUNT_OPTIONS}
						/>
						<div className="absolute" style={{ top: "25px", right: "65px" }}>
							<Button
								loading={false}
								buttonText={"Save"}
								className={`bg-gray-200  text-black round-[15px] py-[3px] px-[10px]`}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
