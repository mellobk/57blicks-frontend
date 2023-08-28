/* eslint-disable no-duplicate-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { FC } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { loginFields } from "@/features/auth/utils/input-fields";
import { ResetPasswordSchemas } from "@/features/auth/utils/Schemas/ResetPasswordSchemas";
import { LoginTitle } from "../LoginTitle";

export const ResetPassword: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<FieldValues>({
		resolver: zodResolver(ResetPasswordSchemas),
	});

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: SubmitHandler<FieldValues> = (data): void => {
		console.log(data);
	};

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title={"Reset Password"}>
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
									</div>

									<div className="flex flex-col gap-1">
										<Button
											buttonText="Continue"
											className={`${
												isValid ? "bg-primary-500" : "bg-gray-300"
											}`}
											disabled={!isValid}
										/>
										<Button
											buttonText="Back"
											className="bg-transparent text-black"
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