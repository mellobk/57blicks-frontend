/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

interface CreatePermissionProps {
	handleSubmitPermission?: (data: { name: string }) => void;
	loading?: boolean;
}

export const CreatePermission: FC<CreatePermissionProps> = ({
	handleSubmitPermission,
	loading,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const onSubmit: SubmitHandler<any> = async (data): Promise<void> => {
		if (handleSubmitPermission) {
			handleSubmitPermission(data);
		}
	};

	return (
		<div className="h-auto w-full rounded-3xl flex flex-col items-center relative">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="w-full flex items-center flex-col gap-3">
					<div className="w-full">
						<Input
							placeholder="Enter you new permission"
							register={register("name", {
								required: "Required field",
							})}
							error={errors["name"] && errors["name"].message}
						/>
					</div>
					<div className="w-full">
						<Button
							loading={loading}
							type="submit"
							buttonText="Create"
							className="bg-primary-500 h-12 w-full"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};
