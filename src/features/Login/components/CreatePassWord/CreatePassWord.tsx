import { FC, useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { PasswordInput } from "@/components/forms/PasswordInput";
import createPassWordFields from "../../utils/input-fields";
import { createPasswordSchema } from "../../utils/Schemas/validations-schemas.ts";
import { passwordInitialsValidations } from "../../utils/constants";
import { validPasswordRules } from "../../utils/functions";
import type { PasswordValidations } from "../../types/validations";

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
	} = useForm<any>({
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
									onSubmit={() => handleSubmit(onSubmit)}
									className="w-full h-full flex flex-col justify-between"
								>
									<PasswordInput
										title="Create Password"
										placeholder="Enter Password"
										required
										register={register(createPassWordFields?.password)}
										passWordValidations={PasswordValidations}
									/>

									<div className="flex flex-col gap-1" ref={buttonContainer}>
										<Button
											text={buttonText}
											className={`${
												errorPassword ? "bg-gray-300" : "bg-primary-500"
											}`}
											disabled={!!errorPassword}
										/>
										<Button text="Back" className="bg-transparent text-black" />
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
