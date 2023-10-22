/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, type FC, useState, useRef } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import ManageUsersService from "@/features/manage-user/api/investors";
import { Button } from "@/components/ui/Button";
import type { PermissionGroup } from "@/features/manage-user/types/api";
import { PermissionToggle } from "../PermissionToggle/PermissionToggle";
import { PermissionType } from "../../types/permission";
import { PermissionHeader } from "../PermissionHeader/PermissionHeader";
import { Modal } from "@/components/ui/Modal";
import { CreatePermission } from "../CreatePermission/CreatePermission";
import ManagePermissionGroupService from "../../api/permission";
import { DeletePermissionGroup } from "../DeletePermissionGroup/DeletePermissionGroup";
import useStore from "@/stores/app-store";
import { Input } from "@/components/forms/Input";

export const Permission: FC = () => {
	const originalSearch = useRef<Array<PermissionGroup>>();
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>();
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [allPermissions, setAllPermissions] =
		useState<Array<PermissionGroup>>();
	const [allPermissionsGroup, setAllPermissionsGroup] =
		useState<Array<PermissionGroup>>();

	const setSuccessMessage = useStore((state) => state.setSuccessMessage);
	const clearSuccessMessage = useStore((state) => state.clearSuccessMessage);

	const createNewPermissionGroup = useMutation((data: PermissionGroup) => {
		return ManagePermissionGroupService.createPermissionGroup(data);
	});

	const deletePermissionGroup = useMutation((id: string) => {
		return ManagePermissionGroupService.deletePermissionGroup(id);
	});

	const addPermissionGroup = useMutation((body: Array<PermissionGroup>) => {
		return ManagePermissionGroupService.addPermissionGroup(body);
	});

	const permissionsGroup = useQuery(
		["all-permission-group-query"],
		() => {
			return ManageUsersService.getAllPermissionGroup();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const permissions = useQuery(
		["all-permission-query"],
		() => {
			return ManageUsersService.allPermission();
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const createPermissionGroups = (data: { name: string }) => {
		createNewPermissionGroup.mutate({
			...data,
			description: `${data.name} Permission`,
		});
	};

	const deletePermissionGroups = () => {
		deletePermissionGroup.mutate(deleteId);
	};

	const addNewPermissionGroup = () => {
		addPermissionGroup.mutate(allPermissionsGroup || []);
	};

	useEffect(() => {
		if (addPermissionGroup.isSuccess) {
			setSuccessMessage("Permissions groups updated successfully");
			setTimeout(() => {
				clearSuccessMessage();
			}, 500);
			addPermissionGroup.reset();
		}
	}, [addPermissionGroup]);

	useEffect(() => {
		const foundPermissions = allPermissions?.filter(
			(value: PermissionGroup) =>
				value?.name?.toLowerCase().includes(searchValue?.toLowerCase() || "")
		);

		if (foundPermissions?.length) {
			setAllPermissions(foundPermissions); // Update the state with the found permissions
		} else {
			setAllPermissions(originalSearch.current); // If you want to show no results when there's no match, otherwise skip this line
		}

		if (!searchValue) {
			setAllPermissions(originalSearch.current);
		}
	}, [searchValue]);

	useEffect(() => {
		if (createNewPermissionGroup.isSuccess || deletePermissionGroup.isSuccess) {
			void permissionsGroup.refetch();
			void permissions.refetch();
			setOpenCreateModal(false);
			setOpenDeleteModal(false);
		}
	}, [createNewPermissionGroup.isSuccess, deletePermissionGroup.isSuccess]);

	useEffect(() => {
		setAllPermissionsGroup(permissionsGroup.data);
		setAllPermissions(permissions.data);
		originalSearch.current = permissions.data;
	}, [permissionsGroup.isFetching, permissions.isFetching]);

	const filterByPermissionType = (type: string): Array<PermissionGroup> => {
		return allPermissions?.filter((data) => data.permissionType === type) || [];
	};

	const handleClickToggle = (position: number, data: PermissionGroup): void => {
		const newPermissions = allPermissionsGroup?.map(
			(permissionGroup: PermissionGroup, key: number) => {
				if (key === position) {
					const findPermission = permissionGroup?.permissions?.find(
						(dataFind: PermissionGroup) => dataFind.name === data.name
					);

					if (findPermission) {
						const filterPermission = permissionGroup.permissions?.filter(
							(dataFind: PermissionGroup) => dataFind?.name !== data.name
						);
						return { ...permissionGroup, permissions: filterPermission };
					} else {
						const newPermission = [
							...(permissionGroup?.permissions || []),
							data,
						];
						return { ...permissionGroup, permissions: newPermission };
					}
				}

				return permissionGroup;
			}
		);

		setAllPermissionsGroup(newPermissions);
	};

	const handleHeaderToggle = (
		checked: boolean,
		permissions: Array<PermissionGroup>,
		position: number,
		permissionType: string
	): void => {
		console.log(permissionType);
		const newPermissions = allPermissionsGroup?.map(
			(permissionGroup: PermissionGroup, key: number) => {
				const oldPermissions = permissionGroup.permissions?.filter(
					(dataFind: PermissionGroup) =>
						dataFind?.permissionType !== permissionType
				);
				if (key === position) {
					return checked === true
						? {
								...permissionGroup,
								permissions: [...(oldPermissions || []), ...permissions],
						  }
						: {
								...permissionGroup,
								permissions: oldPermissions,
						  };
				}

				return permissionGroup;
			}
		);

		setAllPermissionsGroup(newPermissions as Array<PermissionGroup>);
	};
	return (
		<div className="h-auto w-full rounded-3xl flex flex-col items-center relative">
			<div className="flex w-full py-4 px-4 items-center justify-between">
				<div className="text-[24px]">Permissions </div>
				<div className="flex gap-2">
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

					<Button
						buttonText="Save"
						className="px-4 py-2  rounded-2xl"
						onClick={() => {
							addNewPermissionGroup();
						}}
						iconColor={"white"}
						loading={addPermissionGroup.isLoading}
					/>
					<Button
						onClick={(): void => {
							setOpenCreateModal(true);
						}}
						buttonText="Create Permission Set"
						className="px-4 py-2 bg-gold-500/[.12] rounded-2xl"
						variant={"info"}
						deepClassName="font-inter text-sm text-gold-500 font-semibold leading-[17px] tracking-[-0.7px]"
					/>
				</div>
			</div>

			<div className="w-full h-auto overflow-auto ">
				<PermissionHeader
					permissions={filterByPermissionType(PermissionType.OTHERS)}
					permissionsGroups={allPermissionsGroup}
					permissionType={PermissionType.OTHERS}
					type="Permissions"
					handleToggle={handleClickToggle}
					handleOpenDelete={(id) => {
						setOpenDeleteModal(true);
						setDeleteId(id);
					}}
				/>
				<PermissionToggle
					permissions={filterByPermissionType(PermissionType.MANAGE_USER)}
					permissionsGroups={allPermissionsGroup}
					permissionType={PermissionType.MANAGE_USER}
					type="Manage Users"
					handleToggle={handleClickToggle}
					handleHeaderToggle={handleHeaderToggle}
				/>

				<PermissionToggle
					permissions={filterByPermissionType(PermissionType.MANAGE_LOANS)}
					permissionsGroups={allPermissionsGroup}
					permissionType={PermissionType.MANAGE_LOANS}
					type="Manage Loans"
					handleToggle={handleClickToggle}
					handleHeaderToggle={handleHeaderToggle}
				/>

				<PermissionToggle
					permissions={filterByPermissionType(
						PermissionType.MANAGE_OPPORTUNITIES
					)}
					permissionsGroups={allPermissionsGroup}
					permissionType={PermissionType.MANAGE_OPPORTUNITIES}
					type="Manage Opportunities"
					handleToggle={handleClickToggle}
					handleHeaderToggle={handleHeaderToggle}
				/>

				<PermissionToggle
					permissions={filterByPermissionType(PermissionType.OTHERS)}
					permissionsGroups={allPermissionsGroup}
					permissionType={PermissionType.OTHERS}
					type="Others"
					handleToggle={handleClickToggle}
					handleHeaderToggle={handleHeaderToggle}
				/>
			</div>

			<Modal
				visible={openCreateModal}
				onHide={(): void => {
					setOpenCreateModal(false);
				}}
				title="Create Permission Set"
				width="700px"
			>
				<CreatePermission
					handleSubmitPermission={createPermissionGroups}
					loading={createNewPermissionGroup.isLoading}
				/>
			</Modal>

			<Modal
				visible={openDeleteModal}
				onHide={(): void => {
					setOpenDeleteModal(false);
				}}
				title="Delete Permission Set"
				width="600px"
			>
				<DeletePermissionGroup
					handleDeleteGroup={deletePermissionGroups}
					loading={deletePermissionGroup.isLoading}
				/>
			</Modal>
		</div>
	);
};
