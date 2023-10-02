/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/Button";
import { type SubmitHandler, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/Input";
import { useEffect } from "react";
import type { User } from "@/features/manage-user/types/api";
import { MaskInput } from "@/components/forms/MaskInput";

import ManageUsersService from "../../api/investors";
import { useMutation } from "@tanstack/react-query";

import { userAdminEditSchema } from "./general-schemas";
import type { AddAdminFields } from "../../types/fields";
import useStore from "@/stores/app-store";
import { removeCountryCode, unFormatPhone } from "@/utils/common-funtions";

interface EditAdminProps {
	user: User;
	setUser?: (user: User) => void;
	role?: string;
}

export const EditAdmin: React.FC<EditAdminProps> = ({
	user,
	role,
	setUser,
}) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userAdminEditSchema),
		defaultValues: {
			email: user.email,
			mailingAddress: user.mailingAddress,
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
		},
	});

	const setErrorMessage = useStore((state) => state.setErrorMessage);
	const clearErrorMessage = useStore((state) => state.clearErrorMessage);
	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const updateAdmin = useMutation(
		(data: AddAdminFields) => {
			return ManageUsersService.updateAdmin(data);
		},
		{
			onSuccess: () => {
				setSuccessMessage("User updated successfully");
				setUser ? setUser(user) : null;
				setTimeout(() => {
					clearSuccessMessage();
				}, 500);
			},
			onError: (error: unknown) => {
				setErrorMessage(`${(error as any).response.data.message}`);

				setTimeout(() => {
					clearErrorMessage();
				}, 500);
			},
		}
	);

	useEffect(() => {}, [errors]);

	const onSubmit: SubmitHandler<FieldValues> = (): void => {
		updateAdmin.mutate({
			id: user.id || "",
			firstName: getValues("firstName") || "",
			lastName: getValues("lastName") || "",
			mailingAddress: getValues("mailingAddress") || "",
			email: getValues("email") || "",
			phoneNumber:
				`+1` + removeCountryCode(unFormatPhone(getValues("phoneNumber") || "")),
		});
	};
	if (role && !role.includes("admin")) return <></>;

	return (
		<div className="h-full w-full rounded-3xl border border-gray-200 p-2 bg-white">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-end p-2 gap-4"
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						<div className="text-[28px]">General Information</div>
					</div>
					<Button
						buttonText="Save"
						className="absolute top-6 right-20 py-1 px-[10px] bg-gray-250 text-white rounded-3xl"
					/>
				</div>
				<div className="w-full">
					<Input
						id="first_name"
						label="First Name ..."
						placeholder="Enter First Name"
						required
						register={register("firstName")}
						error={errors["firstName"] && errors["firstName"]?.message}
					/>
				</div>
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
						label="Email"
						placeholder="Enter Email"
						required
						register={register("email")}
						error={errors["email"] && errors["email"]?.message}
					/>
				</div>
				<div className="w-full">
					<Input
						label="Mailing address"
						placeholder="Enter Mailing address"
						required
						register={register("mailingAddress")}
						error={
							errors["mailingAddress"] && errors["mailingAddress"]?.message
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
						defaultValue={removeCountryCode(user.phoneNumber || "")}
						error={errors["phoneNumber"] && errors["phoneNumber"]?.message}
					/>
				</div>
			</form>
		</div>
	);
};
