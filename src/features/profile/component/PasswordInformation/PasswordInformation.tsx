import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/stores/app-store";
import { changePassword, getSession } from "@/lib/cognito";
import { changePassWordFields } from "@/features/auth/utils/input-fields";
import { passwordInitialsValidations } from "@/features/auth/utils/constants";
import { changePasswordSchema } from "@/features/auth/utils/Schemas/validations-change-password-schemas";
import type { PasswordValidations } from "@/features/auth/types/validations";
import { FC, useEffect, useState } from "react";
import { validPasswordRules } from "@/features/auth/utils/functions";

export const PasswordInformation: FC = () => {
	const { register, handleSubmit, watch, setValue } = useForm({
		resolver: zodResolver(changePasswordSchema),
	});

	const setErrorMessage = useStore((state) => state.setErrorMessage);
	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearErrorMessage = useStore((state) => state.clearErrorMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);
	const [PasswordValidations, setPasswordValidations] =
		useState<Array<PasswordValidations>>();

	const passwordText = watch(changePassWordFields.newPassword) as string;

	const updateUserPassword = async (
		oldPassword: string,
		newPassword: string
	): Promise<void> => {
		try {
			const session = await getSession();
			if (session.isValid()) {
				await changePassword(oldPassword, newPassword);
				setSuccessMessage("Password changed successfully");
				setValue(changePassWordFields?.oldPassword || "oldPassword", null);
				setValue(changePassWordFields?.newPassword || "newPassword", null);
				setTimeout(clearSuccessMessage, 2000);
			} else {
				console.error("Session is not valid.");
				setErrorMessage("something was wrong");
				setTimeout(clearErrorMessage, 2000);
			}
		} catch (error) {
			console.error("Error:", error);
			setErrorMessage("something was wrong");
			setTimeout(clearErrorMessage, 2000);
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<void> => {
		const oldPassword = data[changePassWordFields?.oldPassword] as string;
		const newPassword = data[changePassWordFields?.newPassword] as string;
		await updateUserPassword(oldPassword, newPassword);
	};

	useEffect(() => {
		const newRules = validPasswordRules(
			passwordText,
			passwordInitialsValidations
		);
		setPasswordValidations(newRules);
	}, [passwordText]);

	return (
		<div className="h-full w-full rounded-3xl border border-gray-200 p-2 ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-end p-2 gap-4"
			>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						{" "}
						<Icon name="passwordProfile" color="black" width="30" />{" "}
						<div className="text-[28px]">Password</div>
					</div>{" "}
					<Button
						buttonText="Save"
						className="py-1 px-[10px] bg-gray-250 text-white"
					/>
				</div>
				<PasswordInput
					label="Old Password"
					required
					placeholder="Enter Old Password"
					register={register(changePassWordFields?.oldPassword)}
				/>
				<PasswordInput
					label="Create Password"
					required
					placeholder="Enter New Password"
					register={register(changePassWordFields?.newPassword)}
					passWordValidations={PasswordValidations}
				/>
			</form>
		</div>
	);
};
