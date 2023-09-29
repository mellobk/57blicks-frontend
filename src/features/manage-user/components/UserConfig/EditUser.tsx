/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { type SubmitHandler, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/Input";
import { useEffect } from "react";
import type { User } from "@/features/manage-user/types/api";
import { MaskInput } from "@/components/forms/MaskInput";
import { generalInformationSchema } from "@/features/profile/utils/Schemas/general-schemas";
import { userEditFields } from "./input-fields";

interface EditUserProps {
	user: User;
}

export const EditUser: React.FC<EditUserProps> = ({ user }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(generalInformationSchema),
	});

	useEffect(() => {
		setValue(userEditFields?.firstName || "firstName", user?.firstName);

		setValue(userEditFields?.lastName || "lastName", user?.lastName);

		setValue(userEditFields?.phoneNumber || "phoneNumber", user?.phoneNumber);

		setValue(userEditFields?.email || "email", user?.email);

		setValue(userEditFields?.mailingAddress || "email", user?.mailingAddress);
	}, []);

	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
		console.log(data);
	};

	return (
		<div className="h-full w-full rounded-3xl border border-gray-200 p-2 bg-white">
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
						className="absolute top-6 right-20 py-1 px-[10px] bg-gray-250 text-white rounded-3xl"
					/>
				</div>
				<div className="w-full">
					<Input
						label="First Name ..."
						placeholder="Enter First Name"
						required
						register={register(userEditFields?.firstName)}
						error={
							errors?.[userEditFields?.firstName] &&
							errors?.[userEditFields?.firstName]?.message
						}
					/>
				</div>
				<div className="w-full">
					<Input
						label="Last Name"
						placeholder="Enter Last Name"
						required
						register={register(userEditFields?.lastName)}
						error={
							errors?.[userEditFields?.lastName] &&
							errors?.[userEditFields?.lastName]?.message
						}
					/>
				</div>
				<div className="w-full">
					<Input
						label="Email"
						placeholder="Enter Email"
						required
						register={register(userEditFields?.email)}
						error={
							errors?.[userEditFields?.email] &&
							errors?.[userEditFields?.email]?.message
						}
					/>
				</div>
				<div className="w-full">
					<Input
						label="Mailing address"
						placeholder="Enter Mailing address"
						required
						register={register(userEditFields?.mailingAddress)}
						error={
							errors?.[userEditFields?.mailingAddress] &&
							errors?.[userEditFields?.mailingAddress]?.message
						}
					/>
				</div>
				<div className="w-full">
					<MaskInput
						label="Phone Number"
						placeholder="Enter Phone Number"
						mask="(999) 999 9999"
						required
						register={register(userEditFields?.phoneNumber)}
						error={
							errors?.[userEditFields?.phoneNumber] &&
							errors?.[userEditFields?.phoneNumber]?.message
						}
					/>
				</div>
			</form>
		</div>
	);
};
