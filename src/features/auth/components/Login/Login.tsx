import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { LoginFields } from "../../types/validations";
import { LoginSchema } from "../../utils/Schemas/LoginSchemas";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Input } from "@/components/forms/Input";
import { useAuth } from "@/providers/AuthContextProvider";
import { Message } from "primereact/message";
import { LoginTitle } from "../LoginTitle";

export const LoginForm: FC = () => {
	const [loginError, setLoginError] = useState<string | null>(null);
	const { signInWithEmail } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFields>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit: SubmitHandler<LoginFields> = async (data): Promise<void> => {
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
							{...register("email")}
							label="Email"
							placeholder="Enter Email"
							required
							error={errors.email?.message}
						/>
						<PasswordInput
							{...register("password")}
							label="Password"
							placeholder="Enter Password"
							required
							error={errors.password?.message}
						/>
						{loginError && <Message severity="error" text={loginError} />}
						<div className="w-full text-center text-sm font-normal leading-normal">
							Reset Password
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<Button type="submit" text="Login" className="bg-primary-500" />
					</div>
				</form>
			</LoginTitle>
		</div>
	);
};
