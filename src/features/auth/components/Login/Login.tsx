/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState } from "react";
import { LoginSchema } from "../../utils/Schemas/LoginSchemas";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Input } from "@/components/forms/Input";
import { Message } from "primereact/message";
import { LoginTitle } from "../LoginTitle";
import { loginFields } from "../../utils/input-fields";
import type { LoginFields } from "../../types/validations";
import { signInWithEmailMfa } from "@/lib/mfa-login";
import { sendToLocalStorage } from "@/utils/local-storage";
import { useNavigate } from "@tanstack/router";
import { AuthRoutesNames } from "../../routes/AuthRouter";

type LoginData = {
	email: string;
	password: string;
};

type LoginFormProps = {
	handleSuccessLogin?: (data: LoginData) => void;
};

export const LoginForm: FC<LoginFormProps> = () => {
	const navigate = useNavigate();
	const [loginError, setLoginError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(LoginSchema),
	});
	const onSubmit: SubmitHandler<any> = async (
		data: LoginFields
	): Promise<void> => {
		try {
			const result = await signInWithEmailMfa(data.email, data.password);
			sendToLocalStorage("user", JSON.stringify(result.data.user));
			sendToLocalStorage("accessToken", result.data.token.accessToken);
			console.log(result.data.token.accessToken);
			void navigate({ to: `/movies` });
		} catch (error) {
			console.log(error);
			setLoginError("Login failed. Please check your credentials.");
		}
	};

	const ResetPassword = (): void => {
		void navigate({ to: `/${AuthRoutesNames.register}` });
	};

	return (
		<>
			<>
				<div className="flex flex-col items-center  gap-3  w-full">
					<LoginTitle>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full h-full flex flex-col justify-between"
						>
							<div className="flex  flex-col justify-between w-full  gap-8">
								<Input
									register={register(loginFields?.email)}
									label="Email"
									placeholder="Enter Email"
									required
									error={errors[loginFields?.email]?.message}
								/>
								<PasswordInput
									register={register(loginFields?.password)}
									label="Password"
									placeholder="Enter Password"
									required
									error={errors[loginFields?.password]?.message}
								/>
							</div>

							<div
								onClick={(): void => {
									ResetPassword();
								}}
								className="w-full text-center text-sm font-normal leading-normal cursor-pointer mt-6"
							>
								Create Account
							</div>
							<div className="flex flex-col gap-1 mt-8">
								<Button
									type="submit"
									buttonText="Login"
									className="bg-primary-500 h-12"
								/>

								{loginError && (
									<Message
										severity="error"
										text={loginError}
										className="mt-6"
									/>
								)}
							</div>
						</form>
					</LoginTitle>
				</div>
			</>
		</>
	);
};
