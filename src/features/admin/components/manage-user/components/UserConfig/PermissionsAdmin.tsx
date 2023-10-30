/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/Button";
import { type FC, useEffect, useRef, useState } from "react";
import type { PermissionGroup, User } from "@/features/admin/components/manage-user/types/api.ts";

import ManageUsersService from "../../api/investors.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Icon } from "@/components/ui/Icon";
import { PermissionToggle } from "../PermissionToggle/PermissionToggle.tsx";
import { Select } from "@/components/forms/Select";
import { Input } from "@/components/forms/Input";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import useStore from "@/stores/app-store.ts";
import { PermissionType } from "@/features/admin/components/profile/types/permission.ts";

interface PermissionsAdmin {
	user: User;
	setUser?: (user: User) => void;
	role?: string;
	enableUser?: (id: string) => void;
	deleteUser?: (id: string) => void;
	callBack?: () => void;
}

export const PermissionsAdmin: FC<PermissionsAdmin> = ({
	user,
	deleteUser,
	enableUser,
	callBack,
}) => {
	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const [userData, _] = useState<User>(user);
	const [groupPermission, setGroupPermission] = useState<string>();

	const [arrayRolesData, setArrayRolesData] = useState<
		Array<{ name: string; code: string }>
	>([]);
	const [searchValue, setSearchValue] = useState<string>();
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const originalSearch = useRef<Array<PermissionGroup>>();
	const { register, setValue, handleSubmit } = useForm<FieldValues>();
	const [allPermissions, setAllPermissions] =
		useState<Array<PermissionGroup>>();
	const [allPermissionsGroup, setAllPermissionsGroup] =
		useState<Array<PermissionGroup>>();
	const [setPermissionsGroup, setSetPermissionsGroup] =
		useState<Array<PermissionGroup>>();

	const filterByPermissionType = (type: string): Array<PermissionGroup> => {
		return allPermissions?.filter((data) => data.permissionType === type) || [];
	};

	const permissionGroupMutation = useMutation((id: string) => {
		return ManageUsersService.permissionGroupById(id || "");
	});

	const permissionGroup = useQuery(
		["all-permission-group-query"],
		() => {
			return ManageUsersService.getAllPermissionGroup();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const roles = useQuery(
		["all-role-query"],
		() => {
			return ManageUsersService.allPermission();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	useEffect(() => {
		setValue("permissionAdminSelect", groupPermission);

		const findPermission = allPermissionsGroup?.filter(
			(data) => data.name === groupPermission
		);
		console.log(findPermission, allPermissionsGroup);
		setSetPermissionsGroup(findPermission);
	}, [groupPermission]);

	const updateAdmin = useMutation(
		(data: User) => {
			return ManageUsersService.updateUserGroupPermission(data);
		},
		{
			onSuccess: () => {
				setSuccessMessage("User permission updated successfully");
				setTimeout(() => {
					clearSuccessMessage();
				}, 500);
			},
		}
	);

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmit: SubmitHandler<any> = async (selectData: {
		permissionAdminSelect: string;
	}): Promise<void> => {
		const permissionData = permissionGroup.data;
		const find = permissionData?.find(
			(data: PermissionGroup) => data.name === selectData.permissionAdminSelect
		);

		await updateAdmin.mutateAsync({
			id: user.id || "",
			permissionGroup: find?.id,
		});

		if (callBack) {
			callBack();
		}
	};

	useEffect(() => {
		return () => {
			permissionGroup.remove();
			roles.remove();
		};
	}, []);

	useEffect(() => {
		const permissionData = roles?.data as Array<PermissionGroup>;

		setAllPermissions(permissionData);

		originalSearch.current = permissionData;
	}, [permissionGroupMutation.isSuccess]);

	useEffect(() => {
		if (arrayRolesData?.length === 0) {
			const permissionGroupData: PermissionGroup | any =
				permissionGroup?.data || [];

			setAllPermissionsGroup(permissionGroupData);

			const permissionsOption = permissionGroupData.map(
				(value: PermissionGroup) => {
					return { name: value.name || "", code: value.name || "" };
				}
			);

			setArrayRolesData(permissionsOption);
		}
	}, [permissionGroup.isFetching]);

	// eslint-disable-next-line @typescript-eslint/require-await
	const getDataPermissions = async (): Promise<any> => {
		if (roles.data && !allPermissions?.length && userData.permissionGroup?.id) {
			const permissionGroupData: PermissionGroup | any =
				permissionGroup?.data || [];
			const find = permissionGroupData.find(
				(data: PermissionGroup) => data.id === userData.permissionGroup?.id
			);
			console.log(find?.name);

			setGroupPermission(find?.name);

			const permissionData = roles?.data;

			setAllPermissions(permissionData);
		}
	};

	const getPermissionData = (name: string): void => {
		setGroupPermission(name);
		setValue("permissionAdminSelect", name);
	};

	useEffect(() => {
		void getDataPermissions();
	}, [roles]);

	useEffect(() => {
		const foundPermissions = allPermissions?.filter(
			(value: PermissionGroup) =>
				value?.name?.toLowerCase().includes(searchValue?.toLowerCase() || "")
		);

		console.log(foundPermissions);

		if (foundPermissions?.length) {
			setAllPermissions(foundPermissions); // Update the state with the found permissions
		} else {
			setAllPermissions(originalSearch.current); // If you want to show no results when there's no match, otherwise skip this line
		}

		if (!searchValue) {
			setAllPermissions(originalSearch.current);
		}
	}, [searchValue]);

	return (
		<div className="h-full w-full rounded-3x p-2 bg-white">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center gap-3 w-full">
					<div className=" flex flex-col w-full p-5 gap-5">
						<div className="flex w-[100%] gap-5">
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="w-full h-full flex flex-col justify-between"
							>
								<div className="flex w-[100%] gap-5">
									<div className="w-[20%]">
										<Select
											key={"selectPermission"}
											options={arrayRolesData}
											label=""
											value={groupPermission}
											register={register("permissionAdminSelect")}
											onChange={(data) => {
												getPermissionData(data.value);
											}}
										/>
									</div>
								</div>
								<Button
									buttonText="Save"
									iconColor="white"
									loading={updateAdmin.isLoading}
									className={`absolute top-[25px] ${
										enableUser && !userData.isActive
											? "right-[215px]"
											: "right-[102px]"
									} py-[3px] px-[10px] bg-gray-250 text-white rounded-3xl`}
								/>
							</form>
							<div className="w-[350px] flex justify-end">
								<div
									className={`${
										searchVisible || searchValue
											? "w-[200px] bg-transparent"
											: "bg-transparent w-[30px]"
									} transition duration-500`}
									onMouseEnter={() => {
										setSearchVisible(true);
									}}
									onMouseLeave={() => {
										setSearchVisible(false);
									}}
								>
									<Input
										type="text"
										value={searchValue}
										iconClassName={`absolute top-0 ${
											searchVisible || searchValue ? "right-3" : "right-1"
										} bottom-0 flex items-center justify-center`}
										placeholder="Search"
										iconColor={
											searchVisible || searchValue
												? "#0E2130"
												: "rgba(14, 33, 48, 0.5)"
										}
										iconWidth={searchValue ? "10" : "18"}
										iconName={searchValue ? "wrong" : "search"}
										onChange={(data) => {
											setSearchValue(data.target.value);
										}}
										clickIcon={() => {
											setSearchValue("");
										}}
										className={`${
											searchVisible || searchValue
												? "bg-gray-200 px-4 py-2"
												: "bg-gray-200 px-1 py-2"
										} rounded-2xl w-full  placeholder-primary-500/[1] text-primary-500 text-[13px] leading-[18px] tracking-[-0.65px] caret-blue-200 items-center outline-none`}
									/>
								</div>
							</div>
						</div>

						<hr className="w-full h-[10px] mt-[10px]" />

						<PermissionToggle
							permissions={filterByPermissionType(PermissionType.MANAGE_USER)}
							permissionsGroups={setPermissionsGroup}
							permissionType={PermissionType.MANAGE_USER}
							type="Manage Users"
						/>

						<PermissionToggle
							permissions={filterByPermissionType(PermissionType.MANAGE_LOANS)}
							permissionsGroups={setPermissionsGroup}
							permissionType={PermissionType.MANAGE_LOANS}
							type="Manage Loans"
						/>

						<PermissionToggle
							permissions={filterByPermissionType(
								PermissionType.MANAGE_OPPORTUNITIES
							)}
							permissionsGroups={setPermissionsGroup}
							permissionType={PermissionType.MANAGE_OPPORTUNITIES}
							type="Manage Opportunities"
						/>

						<PermissionToggle
							permissions={filterByPermissionType(PermissionType.OTHERS)}
							permissionsGroups={setPermissionsGroup}
							permissionType={PermissionType.OTHERS}
							type="Others"
						/>
					</div>

					<div
						onClick={(): void => {
							if (deleteUser) {
								deleteUser(userData.id || "");
							}
						}}
						className={`absolute w-8 h-8 text-gray-1200 border-0 bg-gray-100 rounded-full transition duration-200  flex items-center justify-center cursor-pointer`}
						style={{
							right: enableUser && !userData.isActive ? "175px" : "63px",
							top: "24px",
						}}
					>
						<Icon name="trashBin" width="14" color="#ff0033" />
					</div>

					{enableUser && !userData.isActive && (
						<div
							className="absolute top-10 right-[8px] cursor-pointer	 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 pt-1 pb-1.5 pl-4 pr-4 text-black-500 text-sm font-semibold rounded-3xl"
							onClick={() => {
								if (enableUser) {
									enableUser(user?.id || "");
								}
							}}
						>
							Enable User
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
