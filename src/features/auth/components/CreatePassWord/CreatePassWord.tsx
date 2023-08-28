import { type FC, useEffect, useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import createPassWordFields from "@/features/auth/utils/input-fields";
import { createPasswordSchema } from "@/features/auth/utils/Schemas/validations-schemas.ts";
import { passwordInitialsValidations } from "@/features/auth/utils/constants";
import { validPasswordRules } from "@/features/auth/utils/functions";
import type { PasswordValidations } from "@/features/auth/types/validations";
import { LoginTitle } from "../LoginTitle";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
}

export const CreatePassword: FC<MfaProps> = ({
	title,
	subTitle,
	buttonText,
}) => {
	const buttonContainer = useRef(null);
	const [PasswordValidations, setPasswordValidations] =
		useState<Array<PasswordValidations>>();

	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(createPasswordSchema),
	});
	const passwordText = watch(createPassWordFields.password) as string;
	const errorPassword = errors[createPassWordFields?.password]?.message;

	const onSubmit: SubmitHandler<any> = (data) => {
		console.log(data);
	};

	const triggerAction = async (): Promise<void> => {
		await trigger();
	};

	useEffect(() => {
		void triggerAction();
	}, [watch(createPassWordFields?.password)]);

	useEffect(() => {
		const newRules = validPasswordRules(
			passwordText,
			passwordInitialsValidations
		);
		setPasswordValidations(newRules);
	}, [passwordText]);

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title={title} subTitle={subTitle}>
				<div className="flex  flex-col justify-between w-full h-full gap-5">
					<div className="flex flex-col gap-5 w-full h-full">
						<div className="flex justify-between gap-2w-full h-full ">
							<div className="w-full h-full">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="w-full h-full flex flex-col justify-between"
								>
									<PasswordInput
										label="Create Password"
										placeholder="Enter Password"
										required
										register={register(createPassWordFields?.password)}
										passWordValidations={PasswordValidations}
									/>

									<div className="flex flex-col gap-1" ref={buttonContainer}>
										<Button
											buttonText={buttonText}
											className={`${
												errorPassword ? "bg-gray-300" : "bg-primary-500"
											}`}
											disabled={!!errorPassword}
										/>
										<Button
											buttonText="Back"
											className="bg-transparent text-black"
                      type="submit"
										/>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</LoginTitle>
		</div>
	);
};
