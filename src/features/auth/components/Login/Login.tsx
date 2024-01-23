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
import { useAuth } from "@/providers/AuthContextProvider";
import { Message } from "primereact/message";
import { LoginTitle } from "../LoginTitle";
import { loginFields } from "../../utils/input-fields";
import type { LoginFields } from "../../types/validations";
import { useNavigate } from "@tanstack/router";
import { AuthRoutesNames } from "../../routes/AuthRouter";
import { MfaForm } from "./MfaForm";

type LoginData = {
	email: string;
	password: string;
};

type LoginFormProps = {
	handleSuccessLogin?: (data: LoginData) => void;
};

const hideEmail = (emailParts: string) => {
	return `${emailParts[0]?.replace(
		emailParts[0]?.slice(0, Math.max(0, emailParts[0].length - 4)),
		"*******"
	)}@${emailParts[1]}`;
};
export const LoginForm: FC<LoginFormProps> = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginData>({
		email: "",
		password: "",
	});
	const [loginError, setLoginError] = useState<string | null>(null);
	const [validUser, setValidUser] = useState<boolean | null>(null);
	const { signInWithEmailMfa } = useAuth();
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
			//await signInWithEmail(data.email, data.password, "");
			const resultMfa = await signInWithEmailMfa(data.email, data.password);
			setLoginError(null);
			if (resultMfa) {
				setValidUser(true);
				setLoginData({
					email: data.email,
					password: data.password,
				});
			} else {
				setLoginError("Login failed. Please check your credentials.");
				setValidUser(false);
			}
		} catch (error) {
			console.log(error);
			setLoginError("Login failed. Please check your credentials.");
		}
	};

	const ResetPassword = (): void => {
		void navigate({ to: `/${AuthRoutesNames.resetPassword}` });
	};

	const backRoute = () => {
		setValidUser(null);
	};

	return (
		<>
			{validUser === true ? (
				<>
					<MfaForm
						data={loginData}
						title="Confirm MFA"
						subTitle="We’ve sent a 6 digit code to your registered phone number."
						buttonText="Login"
						labelData={hideEmail(loginData?.email || "")}
						backRoute={backRoute}
					/>
				</>
			) : (
				<>
					<div className="flex flex-col items-center  gap-3 h-full w-full">
						<LoginTitle title={"Welcome Back!"}>
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
									{loginError && <Message severity="error" text={loginError} />}
									<div
										onClick={(): void => {
											ResetPassword();
										}}
										className="w-full text-center text-sm font-normal leading-normal cursor-pointer"
									>
										Reset Password
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<Button
										type="submit"
										buttonText="Login"
										className="bg-primary-500 h-12"
									/>
								</div>
							</form>
						</LoginTitle>
					</div>
				</>
			)}
		</>
	);
};
