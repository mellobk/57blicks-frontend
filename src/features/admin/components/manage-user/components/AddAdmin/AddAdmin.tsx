/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Input";
import { AddAdminSchema } from "@/features/admin/components/manage-user/schemas/AddAdminSchemas";
import { addAdminFields } from "../../utils/input-fields";
import { type FC, useEffect, useState } from "react";
import { MaskInput } from "@/components/forms/MaskInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PermissionGroup, User } from "../../types/api";
import ManageUsersService from "../../api/investors";
import { unFormatPhone } from "@/utils/common-funtions";
import { Select } from "@/components/forms/Select";

interface AddAdminProps {
	handleSuccess?: () => void;
}

export const AddAdmin: FC<AddAdminProps> = ({ handleSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: zodResolver(AddAdminSchema),
	});

	const [arrayRolesData, setArrayRolesData] = useState<
		Array<{ name: string; code: string }>
	>([]);

	const [groupPermission, setGroupPermission] = useState<string>("");
	const [permissionGroupData, setPermissionGroupData] =
		useState<Array<PermissionGroup>>();

	const permissionGroup = useQuery(
		["all-permission-group-query"],
		() => {
			return ManageUsersService.getAllPermissionGroup();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		if (arrayRolesData?.length === 0) {
			const permissionGroupData: PermissionGroup | any =
				permissionGroup?.data || [];

			setPermissionGroupData(permissionGroupData);
			const permissionsOption = permissionGroupData.map(
				(value: PermissionGroup) => {
					return { name: value.name || "", code: value.name || "" };
				}
			);
			setArrayRolesData(permissionsOption);
		}
	}, [permissionGroup.isFetching]);
	const createAdminMutation = useMutation((data: User) => {
		return ManageUsersService.createNewAdmin(data);
	});

	const onSubmit: any = (data: User): void => {
		const permissionData = permissionGroupData?.find(
			(data) => data.name === groupPermission
		);

		const phoneNumber = unFormatPhone(data?.phoneNumber || "");

		const formatData = {
			...data,
			permissionGroup: permissionData?.id,
			[addAdminFields?.phoneNumber]: `+1${phoneNumber}`,
			[addAdminFields?.entityName || ""]: ``,
			[addAdminFields?.companyName || ""]: ``,
		};

		createAdminMutation.mutate({
			...formatData,
		});
	};

	useEffect(() => {
		if (createAdminMutation.isSuccess) {
			handleSuccess && handleSuccess();
		}
		if (createAdminMutation.isError) {
			createAdminMutation.reset();
		}
	}, [createAdminMutation]);

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

								<Select
									key={"selectPermission"}
									options={arrayRolesData}
									label="Permission"
									placeholder="select a permission"
									value={groupPermission}
									register={register("permissionAdminSelect")}
									onChange={(data) => {
										setGroupPermission(data.value);
									}}
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
										loading={createAdminMutation.isLoading}
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
