import { type FC, useEffect, useRef, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import createPassWordFields from "@/features/auth/utils/input-fields";
import { createPasswordSchema } from "@/features/auth/utils/Schemas/validations-schemas";
import {
	mfaCode as localMfa,
	passwordInitialsValidations,
	userEmail,
} from "@/features/auth/utils/constants";
import { validPasswordRules } from "@/features/auth/utils/functions";
import type { PasswordValidations } from "@/features/auth/types/validations";
import { LoginTitle } from "../LoginTitle";
import { forgotPassword } from "@/lib/cognito";
import { useNavigate } from "@tanstack/router";
import { Message } from "primereact/message";
import { removeLocalStorage } from "@/utils/local-storage";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	receptor?: string;
	mfaCode?: string;
	backTo?: string;
}

export const CreatePassword: FC<MfaProps> = ({
	title,
	subTitle,
	buttonText,
	navigateTo,
	receptor,
	mfaCode,
	backTo,
}) => {
	const navigate = useNavigate();

	const buttonContainer = useRef(null);
	const [PasswordValidations, setPasswordValidations] =
		useState<Array<PasswordValidations>>();
	const [createPasswordError, setCreatePasswordError] = useState<any | string>(
		null
	);
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

	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<any> => {
		try {
			const respondCreatePassword = await forgotPassword(
				receptor || "",
				mfaCode || "",
				data[createPassWordFields?.password]
			);

			if (respondCreatePassword === "password updated") {
				void navigate({ to: `/${navigateTo}` });
				removeLocalStorage(userEmail);
				removeLocalStorage(localMfa);
			}
		} catch (error) {
			setCreatePasswordError(error);
		}
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

	const backHandleClick = (): void => {
		void navigate({ to: `/${backTo || ""}` });
	};
	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title={title} subTitle={subTitle}>
				<div className="flex  flex-col justify-between w-full h-full gap-5">
					<div className="flex flex-col gap-5 w-full h-full">
						<div className="flex justify-between gap-2 w-full h-full ">
							<div className="w-full h-full">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="w-full h-full flex flex-col justify-between"
								>
									<div className="flex gap-2 flex-col">
										<PasswordInput
											label="Create Password"
											placeholder="Enter Password"
											required
											register={register(createPassWordFields?.password)}
											passWordValidations={PasswordValidations}
										/>
										{createPasswordError && (
											<Message severity="error" text={createPasswordError} />
										)}
									</div>

									<div className="flex flex-col gap-1" ref={buttonContainer}>
										<Button
											buttonText={buttonText}
											className={`h-12 ${
												errorPassword ? "bg-gray-300" : "bg-primary-500"
											}`}
											disabled={!!errorPassword}
										/>
										<Button
											onClick={backHandleClick}
											buttonText="Back"
											className="h-12  bg-transparent text-black"
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
