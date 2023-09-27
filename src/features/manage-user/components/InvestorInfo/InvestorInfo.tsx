import { useEffect } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { addInvestorFields } from "../../utils/input-fields";
import { AddInvestorSchemas } from "@/features/manage-user/schemas/AddInvestorSchemas";
import type { AddInvestorFields } from "../../types/fields";
import { MaskInput } from "@/components/forms/MaskInput";

interface InvestorInfoProps {
	handleInvestorInfo?: (data: AddInvestorFields) => void;
	data?: AddInvestorFields;
}

export const InvestorInfo: React.FC<InvestorInfoProps> = ({
	handleInvestorInfo,
	data,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(AddInvestorSchemas),
	});

	useEffect(() => {
		if (data) {
			setValue(addInvestorFields?.firstName, data?.firstName);
			setValue(addInvestorFields?.lastName, data?.firstName);
			setValue(addInvestorFields?.phoneNumber, data?.phoneNumber);
			setValue(addInvestorFields?.email, data?.email);
			setValue(
				addInvestorFields?.streetAddress || "streetAddress",
				data?.streetAddress
			);
			setValue(addInvestorFields?.einSsn || "einSsn", data?.einSsn);
			setValue(addInvestorFields?.zip || "zip", data?.zip);
		}
	}, []);

	const onSubmit: SubmitHandler<FieldValues> = (data: any): void => {
		if (handleInvestorInfo) {
			handleInvestorInfo(data);
		}
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
								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											label="First Name"
											placeholder="Enter First Name"
											required
											register={register(addInvestorFields?.firstName)}
											error={
												errors?.[addInvestorFields?.firstName] &&
												errors?.[addInvestorFields?.firstName]?.message
											}
										/>
									</div>
									<div className="w-full">
										<Input
											label="Last Name"
											placeholder="Enter Last Name"
											required
											register={register(addInvestorFields?.lastName)}
											error={
												errors?.[addInvestorFields?.lastName] &&
												errors?.[addInvestorFields?.lastName]?.message
											}
										/>
									</div>
								</div>

								<Input
									label="Email"
									placeholder="Enter Email"
									register={register(addInvestorFields?.email)}
									required
									error={errors?.[addInvestorFields?.email]?.message}
								/>

								<div className="flex w-full gap-4">
									<div className="w-full">
										<MaskInput
											label="Phone Number"
											mask="(999) 999-9999"
											placeholder="(XXX) XXX-XXXX"
											register={register(addInvestorFields?.phoneNumber)}
											required={true}
											error={errors?.[addInvestorFields?.phoneNumber]?.message}
										/>
									</div>
									<div className="w-[40%]">
										<MaskInput
											label="SSN/EIN"
											mask="999 999 999"
											placeholder="XXXXX"
											register={register(addInvestorFields?.einSsn || "einSsn")}
										/>
									</div>
								</div>

								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											label="Street Address"
											placeholder="Enter Street Address"
											register={register(
												addInvestorFields?.streetAddress || "streetAddress"
											)}
										/>
									</div>
									<div className="w-[40%]">
										<MaskInput
											label="ZIP"
											mask="99999"
											placeholder="XXXXX"
											register={register(addInvestorFields?.zip || "zip")}
										/>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<Button
										buttonText="Enter Banking Details"
										className={`bg-primary-500`}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
