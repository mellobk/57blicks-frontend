import { Button } from "@/components/ui/Button";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/Input";
import { type FC, useEffect } from "react";
import type { User } from "@/features/admin/components/manage-user/types/api";
import { MaskInput } from "@/components/forms/MaskInput";

import ManageUsersService from "../../api/investors";
import { useMutation } from "@tanstack/react-query";

import { userAccountingEditSchema } from "./general-schemas";
import type { AddAccountingFields } from "../../types/fields";
import useStore from "@/stores/app-store";
import { removeCountryCode, unFormatPhone } from "@/utils/common-funtions";
import { Icon } from "@/components/ui/Icon";

interface EditAccountingProps {
	user: User;
	setUser?: (user: User) => void;
	role?: string;
	deleteUser?: (id: string) => void;
}

export const EditAccounting: FC<EditAccountingProps> = ({
	user,
	role,
	setUser,
	deleteUser,
}) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userAccountingEditSchema),
		defaultValues: {
			email: user.email,
			mailingAddress: user.mailingAddress,
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			companyName: user.companyName,
		},
	});

	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const updateAdmin = useMutation(
		(data: AddAccountingFields) => {
			return ManageUsersService.updateAccounting(data);
		},
		{
			onSuccess: () => {
				setSuccessMessage("User updated successfully");
				setUser ? setUser(user) : null;
				setTimeout(() => {
					clearSuccessMessage();
				}, 500);
			},
		}
	);

	useEffect(() => {
		console.log("🚀 ~ file: EditAccounting.tsx:27 ~ errors:", errors);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors]);

	const onSubmit: SubmitHandler<FieldValues> = async (): Promise<void> => {
		await updateAdmin.mutateAsync({
			id: user.id || "",
			firstName: getValues("firstName") || "",
			lastName: getValues("lastName") || "",
			mailingAddress: getValues("mailingAddress") || "",
			email: getValues("email") || "",
			phoneNumber:
				`+1` + removeCountryCode(unFormatPhone(getValues("phoneNumber") || "")),
			companyName: getValues("companyName") || "",
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

						<div
							onClick={(): void => {
								if (deleteUser) {
									deleteUser(user.id || "");
								}
							}}
							className="absolute w-8 h-8 text-gray-1200 border-0 bg-gray-100 rounded-full transition duration-200  flex items-center justify-center cursor-pointer"
							style={{ right: "63px", top: "24px" }}
						>
							<Icon name="trashBin" width="14" color="#ff0033" />
						</div>
					</div>
					<Button
						buttonText="Save"
						variant={"gray"}
						className="absolute top-[25px] right-[102px] py-[3px] px-[10px] bg-gray-250 text-white rounded-3xl"
					/>
				</div>
				<div className="w-full">
					<Input
						id="first_name"
						label="First Name"
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
				<div className="w-full">
					<Input
						label="Company"
						placeholder="Enter Company"
						required
						register={register("companyName")}
						error={errors["companyName"] && errors["companyName"]?.message}
					/>
				</div>
			</form>
		</div>
	);
};