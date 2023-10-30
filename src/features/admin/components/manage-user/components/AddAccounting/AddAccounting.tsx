import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { AddAdminSchema } from "@/features/admin/components/manage-user/schemas/AddAdminSchemas";
import { addAdminFields } from "../../utils/input-fields";
import { type FC, useEffect } from "react";
import { MaskInput } from "@/components/forms/MaskInput";
import { useMutation } from "@tanstack/react-query";
import type { User } from "../../types/api";
import ManageUsersService from "../../api/investors";
import { unFormatPhone } from "@/utils/common-funtions";

interface AddAdminProps {
	handleSuccess?: () => void;
}

export const AddAccounting: FC<AddAdminProps> = ({ handleSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(AddAdminSchema),
	});

	const createAccountingMutation = useMutation((data: User) => {
		return ManageUsersService.createNewAccounting(data);
	});

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: any = (data: User): void => {
		const phoneNumber = unFormatPhone(data?.phoneNumber || "");

		const formatData = {
			...data,
			[addAdminFields?.phoneNumber]: `+1${phoneNumber}`,
			[addAdminFields?.entityName || ""]: ``,
		};

		createAccountingMutation.mutate({
			...formatData,
		});
		console.log(formatData);
	};

	useEffect(() => {
		if (createAccountingMutation.isSuccess) {
			handleSuccess && handleSuccess();
		}
		if (createAccountingMutation.isError) {
			createAccountingMutation.reset();
		}
	}, [createAccountingMutation]);

	return (
		<div className="flex  flex-col justify-between w-full h-full gap-5">
			<div className="flex flex-col gap-5 w-full h-full">
				<div className="flex justify-between gap-2 w-full h-full ">
					<div className="w-full h-full">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="w-full h-full flex flex-col justify-between"
						>
							<div className="flex  flex-col justify-between w-full  gap-6">
								<div className="flex w-full gap-4">
									<div className="w-full">
										<Input
											label="First Name"
											placeholder="Enter First Name"
											required
											register={register(addAdminFields?.firstName)}
											error={
												errors?.[addAdminFields?.firstName] &&
												errors?.[addAdminFields?.firstName]?.message
											}
										/>
									</div>
									<div className="w-full">
										<Input
											label="Last Name"
											placeholder="Enter Last Name"
											required
											register={register(addAdminFields?.lastName)}
											error={
												errors?.[addAdminFields?.lastName] &&
												errors?.[addAdminFields?.lastName]?.message
											}
										/>
									</div>
								</div>

								<Input
									label="Company Name"
									placeholder="Enter Company Name"
									register={register(addAdminFields?.companyName || "")}
									error={
										errors?.[addAdminFields?.companyName || ""] &&
										errors?.[addAdminFields?.companyName || ""]?.message
									}
								/>

								<Input
									label="Mailing Address"
									placeholder="Enter Mailing Address"
									register={register(addAdminFields?.mailingAddress)}
									required
									error={
										errors?.[addAdminFields?.mailingAddress] &&
										errors?.[addAdminFields?.mailingAddress]?.message
									}
								/>

								<Input
									label="Email"
									placeholder="Enter Email"
									register={register(addAdminFields?.email)}
									required
									error={
										errors?.[addAdminFields?.email] &&
										errors?.[addAdminFields?.email]?.message
									}
								/>

								<MaskInput
									label="Phone Number"
									mask="(999) 999-9999"
									placeholder="(XXX) XXX-XXXX"
									register={register(addAdminFields?.phoneNumber)}
									required
									error={
										errors?.[addAdminFields?.phoneNumber] &&
										errors?.[addAdminFields?.phoneNumber]?.message
									}
								/>
								<div className="flex flex-col gap-1">
									<Button
										buttonText="Send Invite"
										className={`bg-primary-500`}
										loading={createAccountingMutation.isLoading}
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
