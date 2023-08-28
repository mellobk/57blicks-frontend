/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const LoginForm: FC = () => {
	const [loginError, setLoginError] = useState<string | null>(null);
	const { signInWithEmail } = useAuth();
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
			const session = await signInWithEmail(data.email, data.password);
			console.log("Successfully logged in:", session);
		} catch {
			setLoginError("Login failed. Please check your credentials.");
		}
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
						<div className="w-full text-center text-sm font-normal leading-normal">
							Reset Password
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<Button
							type="submit"
							buttonText="Login"
							className="bg-primary-500"
						/>
					</div>
				</form>
			</LoginTitle>
		</div>
	);
};
