import type { FC } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Input } from "@/components/forms/Input";
import { loginFields } from "@/features/Login/utils/input-fields";
import { LoginSchema } from "@/features/Login/utils/Schemas/LoginSchemas";
import { LoginTitle } from "../LoginTitle";

export const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<FieldValues>({
		resolver: zodResolver(LoginSchema),
	});

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: SubmitHandler<FieldValues> = (data): void => {
		console.log(data);
	};

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title="Welcome Back!">
				<div className="flex  flex-col justify-between w-full h-full gap-5">
					<div className="flex flex-col gap-5 w-full h-full">
						<div className="flex justify-between gap-2 w-full h-full ">
							<div className="w-full h-full">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="w-full h-full flex flex-col justify-between"
								>
									<div className="flex  flex-col justify-between w-full  gap-8">
										<Input
											label="Email"
											placeholder="Enter Email"
											required
											register={register(loginFields?.email)}
										/>
										<PasswordInput
											label="Password"
											placeholder="Enter Password"
											required
											register={register(loginFields?.password)}
										/>

										<div className="w-full text-center text-sm font-normal  leading-normal">
											Reset Password
										</div>
									</div>

									<div className="flex flex-col gap-1">
										<Button
											text="Login"
											className={`${
												isValid ? "bg-primary-500" : "bg-gray-300"
											}`}
											disabled={!isValid}
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
