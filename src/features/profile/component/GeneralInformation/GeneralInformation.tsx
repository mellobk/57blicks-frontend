/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { type SubmitHandler, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/Input";
import { generalInformationSchema } from "../../utils/Schemas/general-schemas";
import { generalInformationFields } from "../../utils/input-fields";
import { useEffect } from "react";
import { getLocalStorage } from "@/utils/local-storage";
import { userBasicInformation } from "@/utils/constant";
import type { User } from "@/features/manage-user/types/api";
import { MaskInput } from "@/components/forms/MaskInput";

export const GeneralInformation: React.FC = () => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(generalInformationSchema),
	});

	useEffect(() => {
		const userData = getLocalStorage(userBasicInformation);
		const parseData = JSON.parse(userData) as User;

		setValue(
			generalInformationFields?.firstName || "firstName",
			parseData?.firstName
		);

		setValue(
			generalInformationFields?.lastName || "lastName",
			parseData?.lastName
		);

		setValue(
			generalInformationFields?.phoneNumber || "phoneNumber",
			parseData?.phoneNumber
		);

		setValue(generalInformationFields?.email || "email", parseData?.email);

		setValue(generalInformationFields?.company || "company", parseData?.sub);
	}, []);

	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
		console.log(data);
	};

	return (
		<div className="h-full w-full rounded-3xl border border-gray-200 p-2 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-end p-2 gap-4"
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						{" "}
						<Icon name="userProfile" color="black" width="30" />{" "}
						<div className="text-[28px]">General Information</div>
					</div>{" "}
					<Button
						buttonText="Save"
						className="py-1 px-[10px] bg-gray-250 text-white"
					/>
				</div>
				<div className="flex w-full gap-4">
					<div className="w-full">
						<Input
							label="First Name"
							placeholder="Enter First Name"
							required
							register={register(generalInformationFields?.firstName)}
							error={
								errors?.[generalInformationFields?.firstName] &&
								errors?.[generalInformationFields?.firstName]?.message
							}
						/>
					</div>
					<div className="w-full">
						<Input
							label="Last Name"
							placeholder="Enter Last Name"
							required
							register={register(generalInformationFields?.lastName)}
							error={
								errors?.[generalInformationFields?.lastName] &&
								errors?.[generalInformationFields?.lastName]?.message
							}
						/>
					</div>
				</div>

				<div className="flex w-full gap-4">
					<div className="w-full">
						<Input
							label="Email"
							placeholder="Enter Email"
							required
							register={register(generalInformationFields?.email)}
							error={
								errors?.[generalInformationFields?.email] &&
								errors?.[generalInformationFields?.email]?.message
							}
						/>
					</div>
					<div className="w-full">
						<MaskInput
							label="Phone Number"
							placeholder="Enter Phone Number"
							mask="(999) 999 9999"
							required
							register={register(generalInformationFields?.phoneNumber)}
							error={
								errors?.[generalInformationFields?.phoneNumber] &&
								errors?.[generalInformationFields?.phoneNumber]?.message
							}
						/>
					</div>
				</div>
				<Input
					label="Company"
					placeholder="Enter Company"
					required
					register={register(generalInformationFields?.company)}
					error={
						errors?.[generalInformationFields?.company] &&
						errors?.[generalInformationFields?.company]?.message
					}
				/>
			</form>
		</div>
	);
};
