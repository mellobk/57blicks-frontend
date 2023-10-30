import { type FC, useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { loginFields } from "@/features/auth/utils/input-fields.ts";
import { ResetPasswordSchemas } from "@/features/auth/utils/Schemas/ResetPasswordSchemas.ts";
import { LoginTitle } from "../LoginTitle";
import { sendCode } from "@/lib/cognito.ts";
import { useNavigate } from "@tanstack/router";
import { sendToLocalStorage } from "@/utils/local-storage.ts";
import { userEmail } from "../../utils/constants.ts";
import { Message } from "primereact/message";

export const ResetPassword: FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<FieldValues>({
		resolver: zodResolver(ResetPasswordSchemas),
	});

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: SubmitHandler<FieldValues> = async (data): Promise<any> => {
		try {
			sendToLocalStorage(userEmail, data[loginFields?.email]);
			await sendCode(data[loginFields?.email]);
		} catch (error) {
			console.log(error);
			setErrorMessage("Something goes wrong");
		}

		void navigate({ to: `/reset-password-mfa` });
	};

	const backTo = (): void => {
		void navigate({ to: `/login` });
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

										{errorMessage && (
											<Message severity="error" text={errorMessage} />
										)}
									</div>

									<div className="flex flex-col gap-1">
										<Button
											buttonText="Continue"
											size={"large"}
											className={`h-12  ${
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
			<div className="w-full">
				<Button
					buttonText="Back"
					className="h-12 bg-transparent text-black w-full"
					size={"large"}
					onClick={backTo}
				/>
			</div>
		</div>
	);
};
