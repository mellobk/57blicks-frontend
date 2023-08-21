/* eslint-disable @typescript-eslint/no-misused-promises */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { LoginTitle } from "../LoginTitle";
import { loginFields } from "../../utils/inputFields";
import { Input } from "@/components/forms/Input";
import { ResetPasswordSchemas } from "../../utils/Schemas/ResetPasswordSchemas";

export const ResetPassword: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<any>({
		resolver: zodResolver(ResetPasswordSchemas),
	});

	const onSubmit: SubmitHandler<any> = (data) => {
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
											title="Email"
											placeholder="Enter Email"
											required
											register={register(loginFields?.email)}
										/>
									</div>

									<div className="flex flex-col gap-1">
										<Button
											text="Continue"
											className={`${
												isValid ? "bg-primary-500" : "bg-gray-300"
											}`}
											disabled={isValid ? false : true}
										/>
										<Button text="Back" className="bg-transparent text-black" />
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
