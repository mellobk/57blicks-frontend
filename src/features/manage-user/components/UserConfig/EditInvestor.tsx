/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/Button";
import { type SubmitHandler, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/Input";
import { useEffect } from "react";
import type { Investor } from "@/features/manage-user/types/api";
import { MaskInput } from "@/components/forms/MaskInput";
import { Select } from "@/components/forms/Select";
import ManageUsersService from "../../api/investors";
import { useMutation } from "@tanstack/react-query";

import { userInvestorEditSchema } from "./general-schemas";
import type { InvestorFields } from "../../types/fields";
import useStore from "@/stores/app-store";
import { removeCountryCode, unFormatPhone } from "@/utils/common-funtions";
import { ACCOUNT_OPTIONS } from "../../utils/constant";

interface EditInvestorProps {
	investor: Investor;
	setUser?: (user: Investor) => void;
}

export const EditInvestor: React.FC<EditInvestorProps> = ({
	investor,
	setUser,
}) => {
	const {
		register,
		handleSubmit,
		getValues,

		formState: { errors },
	} = useForm({
		resolver: zodResolver(userInvestorEditSchema),
		defaultValues: {
			email: investor.user?.email,
			mailingAddress: investor.user?.mailingAddress,
			firstName: investor.user?.firstName,
			lastName: investor.user?.lastName,
			phoneNumber: investor.user?.phoneNumber,
			entityName: "",
			ssnEin: investor.ssnEin,
			zip: investor.zip,
			streetAddress: investor.streetAddress,
			accountNumber: investor.accountNumber,
			routingNumber: investor.routingNumber,
			accountType: investor.accountType,
			bankingName: investor.bankingName,
		},
	});

	const setErrorMessage = useStore((state) => state.setErrorMessage);
	const clearErrorMessage = useStore((state) => state.clearErrorMessage);
	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const updateAdmin = useMutation(
		(data: InvestorFields) => {
			return ManageUsersService.updateInvestors(data);
		},
		{
			onSuccess: () => {
				setSuccessMessage("User updated successfully");
				setUser ? setUser(investor) : null;
				setTimeout(() => {
					clearSuccessMessage();
				}, 500);
			},
			onError: (error: any) => {
				setErrorMessage(`${error.response.data.message}`);
				setTimeout(() => {
					clearErrorMessage();
				}, 500);
			},
		}
	);

	useEffect(() => {
		console.log("🚀 ~ file: EditInvestor.tsx:27 ~ errors:", errors);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors]);

	const onSubmit: SubmitHandler<FieldValues> = async (): Promise<void> => {
		updateAdmin.mutate({
			id: investor.id || "",
			ssnEin: getValues("ssnEin") || "",
			zip: getValues("zip") || "",
			streetAddress: getValues("streetAddress") || "",
			accountNumber: getValues("accountNumber") || "",
			routingNumber: getValues("routingNumber") || "",
			accountType: getValues("accountType") || "",
			bankingName: getValues("bankingName") || "",
			user: {
				firstName: getValues("firstName") || "",
				lastName: getValues("lastName") || "",
				mailingAddress: getValues("mailingAddress") || "",
				email: getValues("email") || "",
				phoneNumber:
					`+1` +
					removeCountryCode(unFormatPhone(getValues("phoneNumber") || "")),
			},
		});
	};

	return (
		<div className="h-full w-full rounded-3xl border border-gray-200 p-2 bg-white">
			<form onSubmit={handleSubmit(onSubmit)} className="">
				<div className="gap-2">
					{/* <div className="flex items-center gap-3">
						<div className="text-[28px]">General Information</div>
					</div> */}

					<div className="flex">
						<div className="w-2/3 bg-white p-4 shadow-lg m-6">
							<div className="flex items-center gap-3">
								<div className="text-[28px]">General Information</div>
							</div>
							<div className="flex  flex-col justify-between w-full  gap-6">
								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											id="first_name"
											label="First Name ..."
											placeholder="Enter First Name"
											required
											register={register("firstName")}
											error={
												errors["firstName"] && errors["firstName"]?.message
											}
										/>
									</div>
									<div className="w-full">
										<MaskInput
											label="Phone Number"
											placeholder="Enter Phone Number"
											mask="(999) 999 9999"
											required
											value={removeCountryCode(getValues("phoneNumber") || "")}
											register={register("phoneNumber")}
											defaultValue={removeCountryCode(
												investor.user?.phoneNumber || ""
											)}
											error={
												errors["phoneNumber"] && errors["phoneNumber"]?.message
											}
										/>
									</div>
								</div>

								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											label="Last Name"
											placeholder="Enter Last Name"
											required
											register={register("lastName")}
											error={errors["lastName"] && errors["lastName"]?.message}
										/>
									</div>
									<div className="w-full">
										<Input
											label="SSN/EIN"
											placeholder="Enter SSN/EIN"
											required
											register={register("ssnEin")}
											error={errors["ssnEin"] && errors["ssnEin"]?.message}
										/>
									</div>
								</div>

								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											label="Entity Name"
											placeholder="Enter Entity Name"
											required
											register={register("entityName")}
											error={
												errors["entityName"] && errors["entityName"]?.message
											}
										/>
									</div>
									<div className="w-full">
										<Input
											label="Mailing address"
											placeholder="Enter Mailing address"
											required
											register={register("mailingAddress")}
											error={
												errors["mailingAddress"] &&
												errors["mailingAddress"]?.message
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
											register={register("email")}
											error={errors["email"] && errors["email"]?.message}
										/>
									</div>
									<div className="w-full">
										<Input
											label="Zip"
											placeholder="Enter zip"
											required
											register={register("zip")}
											error={errors["zip"] && errors["zip"]?.message}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="w-1/3 bg-white p-4 shadow-lg">
							<div className="flex  flex-col justify-between w-full  gap-6">
								<div className="w-full">
									<Input
										label="Banking Name"
										placeholder="Enter Banking Name"
										required
										register={register("bankingName")}
										error={
											errors["bankingName"] && errors["bankingName"]?.message
										}
									/>
								</div>
								<div className="w-full">
									<Input
										label="Routing Number"
										placeholder="Enter Routing Number"
										required
										register={register("routingNumber")}
										error={
											errors["routingNumber"] &&
											errors["routingNumber"]?.message
										}
									/>
								</div>

								<div className="w-full">
									<Input
										label="Account Number"
										placeholder="Enter Account Number"
										required
										register={register("accountNumber")}
										error={
											errors["accountNumber"] &&
											errors["accountNumber"]?.message
										}
									/>
								</div>

								<div className="w-full">
									<Select
										register={register("accountType")}
										className="flex flex-col gap-2"
										label="Account Type"
										error={
											errors["accountType"] && errors["accountType"]?.message
										}
										required
										placeholder="Select Account Type"
										value={{
											name: "",
											code: "",
										}}
										options={ACCOUNT_OPTIONS}
									/>
								</div>
							</div>
						</div>
					</div>

					<Button
						buttonText="Save"
						className="absolute top-6 right-20 py-1 px-[10px] bg-gray-250 text-white rounded-3xl"
					/>
				</div>
			</form>
		</div>
	);
};
