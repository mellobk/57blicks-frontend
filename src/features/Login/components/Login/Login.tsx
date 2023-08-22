import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { loginFields } from "../../utils/inputFields";
import { Input } from "@/components/forms/Input";
import { LoginSchema } from "../../utils/Schemas/LoginSchemas";

export const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<any>({
		resolver: zodResolver(LoginSchema),
	});

	const onSubmit: SubmitHandler<any> = (data) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full">
			<LoginTitle title={"Welcome Back!"}>
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
											title="Email"
											placeholder="Enter Email"
											required
											register={register(loginFields?.email)}
										/>
										<PasswordInput
											title="Password"
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
