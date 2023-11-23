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
import { getSession } from "@/lib/cognito";
import { sendToLocalStorage } from "@/utils/local-storage";
import { accessToken, group } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import ManageLogService from "@/features/admin/components/manage-user/api/logs";

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
	const { signInWithEmail } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(LoginSchema),
	});

	const createLoginLog = useMutation(async () => {
		await ManageLogService.createLoginLog();
	});

	const onSubmit: SubmitHandler<any> = async (
		data: LoginFields
	): Promise<void> => {
		try {
			await signInWithEmail(data.email, data.password, "");
			const sessionData: any = await getSession();
			const groupAws: string =
				sessionData?.accessToken?.payload["cognito:groups"][0] || "admin";

			sendToLocalStorage(group, JSON.stringify(groupAws));
			sendToLocalStorage(accessToken, `${sessionData?.idToken?.jwtToken}`);

			createLoginLog.mutate();

			window.location.href =
				groupAws === "investor"
					? "/investors/portfolio"
					: "/manage-users/admins";
		} catch (error) {
			console.log(error);
			setLoginError("Login failed. Please check your credentials.");
		}
	};

	const ResetPassword = (): void => {
		void navigate({ to: `/${AuthRoutesNames.resetPassword}` });
	};

	return (
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
	);
};
