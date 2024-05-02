/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type FC, useEffect, useRef, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import createPassWordFields from "@/features/auth/utils/input-fields";
import { registerSchema } from "@/features/auth/utils/Schemas/validations-schemas";
import { passwordInitialsValidations } from "@/features/auth/utils/constants";
import { validPasswordRules } from "@/features/auth/utils/functions";
import type { PasswordValidations } from "@/features/auth/types/validations";
import { LoginTitle } from "../LoginTitle";
import { useNavigate } from "@tanstack/router";
import { Message } from "primereact/message";
import { Input } from "@/components/forms/Input";
import { registerAccount } from "@/lib/mfa-login";
import useStore from "@/stores/app-store";

interface MfaProps {
	title?: string;
	subTitle?: string;
	navigateTo?: string | null;
	buttonText?: string;
	receptor?: string;
	mfaCode?: string;
	backTo?: string;
}

export const Register: FC<MfaProps> = ({
	title,
	subTitle,
	buttonText,
	navigateTo,
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
		resolver: zodResolver(registerSchema),
	});

	const passwordText = watch(createPassWordFields.password) as string;
	const errorPassword = errors[createPassWordFields?.password]?.message;

	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<any> => {
		try {
			const createAccount = await registerAccount(
				data[createPassWordFields?.firstName],
				data[createPassWordFields?.lastName],
				data[createPassWordFields?.email],
				data[createPassWordFields?.password]
			);

			if (createAccount) {
				setSuccessMessage("User register successfully");
				setTimeout(() => {
					clearSuccessMessage();
				}, 500);

				void navigate({ to: `/${navigateTo}` });
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
										<Input
											label="First Name"
											placeholder="Enter First Name"
											required
											register={register(createPassWordFields?.firstName)}
											error={errors[createPassWordFields?.firstName]?.message}
										/>

										<Input
											label="Last Name"
											placeholder="Enter Last Name"
											required
											register={register(createPassWordFields?.lastName)}
											error={errors[createPassWordFields?.lastName]?.message}
										/>
										<Input
											label="Email"
											placeholder="Enter Email"
											required
											register={register(createPassWordFields?.email)}
											error={errors[createPassWordFields?.email]?.message}
										/>

										<PasswordInput
											label="Password"
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
