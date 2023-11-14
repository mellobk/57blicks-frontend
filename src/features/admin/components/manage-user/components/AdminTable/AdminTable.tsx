/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AddAdmin } from "../AddAdmin/AddAdmin";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { DeleteAdmin } from "../DeleteAdmin/DeleteAdmin";
import ManageUsersService from "../../api/investors";
import { Modal } from "@/components/ui/Modal/Modal";
import { Table } from "@/features/admin/components/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { User } from "../../types/api";
import UserConfig from "../UserConfig/UserConfig";
import {
	emptyObject,
	findIndex,
	findPermission,
} from "@/utils/common-funtions";
import { TabData } from "../../utils/tabs";
import userStore from "@/stores/user-store.ts";
import { PermissionType } from "@/types/api/permissions-type";
import { useNavigate } from "@tanstack/router";

interface SuccessProps {}

export const AdminTable: FC<SuccessProps> = () => {
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [detailModal, setDetailModal] = useState<boolean>(true);
	const [deleteId, setDeleteId] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const userInfo = userStore((state) => state.userInfo);
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	useEffect(() => {
		const find = findPermission(
			userLoggedInfo?.role,
			userLoggedInfo?.permissionGroup?.permissions || [],
			PermissionType.VIEW_ADMINS
		);

		if (!find) {
			void navigate({ to: `/manage-users/investors` });
		}
	}, [userLoggedInfo]);

	useEffect(() => {
		if (!emptyObject(userInfo)) {
			setSelectedUser(userInfo);
		}
	}, [userInfo]);

	const adminQuery = useQuery(
		["admin-query"],
		() => {
			return findPermission(
				userLoggedInfo?.role,
				userLoggedInfo?.permissionGroup?.permissions || [],
				PermissionType.VIEW_ADMINS
			)
				? ManageUsersService.filterAllAdmins(searchValue)
				: [];
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const deleteAdminMutation = useMutation((id: string) => {
		return ManageUsersService.deleteUser(id);
	});

	const handleSuccessDelete = async (): Promise<void> => {
		await adminQuery.refetch();
		setOpenDeleteModal(false);
		setDetailModal(false);
		deleteAdminMutation.reset();
	};

	useEffect(() => {
		if (deleteAdminMutation.isSuccess) {
			void handleSuccessDelete();
		}
	}, [deleteAdminMutation]);

	const handleDeleteUser = (id: string) => {
		deleteAdminMutation.mutate(id);
	};

	const handleDeleteAdmin = (id: string) => {
		setOpenDeleteModal(!openDeleteModal);
		setDeleteId(id);
	};

	const closeDeleteAdminModal = (): void => {
		setOpenDeleteModal(!openDeleteModal);
	};

	const addAdmin = (): void => {
		setOpenModal(!openModal);
	};

	const closeModal = (): void => {
		setOpenModal(false);
	};

	const successCreateAdmin = async (): Promise<void> => {
		void adminQuery.refetch();
		setOpenModal(false);
	};

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	const handleRowClicked = (row: unknown): void => {
		setSelectedUser(row as User);
	};

	const handleRefetch = async (): Promise<void> => {
		console.log(
			"🚀 ~ file: AdminTable.tsx:87 ~ handleRefetch ~ handleRefetch:"
		);
		await adminQuery.refetch();
	};

	useEffect(() => {
		void adminQuery.refetch();
	}, [searchValue]);

	const conditionalRowStyles = [
		{
			when: (row: User) => !row?.isActive,
			style: {
				opacity: 0.4,
			},
		},
	];

	const columns = [
		{
			name: "#",
			maxWidth: "50px",
			//	cell: row => <CustomTitle row={row} />,
			selector: (row: User): number =>
				findIndex(adminQuery.data || [], row?.id || ""),
			omit: false,
		},
		{
			name: "name",
			selector: (row: User): string => `${row?.firstName} ${row?.lastName}`,
			sortable: true,
			omit: false,
		},
		{
			name: "Email",
			selector: (row: User): string => row?.email || "",
			sortable: true,
			omit: false,
		},
		{
			name: "Phone Number",
			selector: (row: User): string => row?.phoneNumber || "",
			omit: false,
		},
		{
			name: "Mailing Address",
			selector: (row: User): string => row?.mailingAddress || "",
			omit: false,
		},
		{
			name: "Status",
			maxWidth: "50px",
			selector: (row: User): JSX.Element => (
				<TableStatus status={row.isActive ? "Active" : "Inactive"} />
			),
			sortable: true,
			omit: false,
		},
	];

	return (
		<>
			{adminQuery.data && (
				<Table
					showAddButton={findPermission(
						userLoggedInfo?.role,
						userLoggedInfo?.permissionGroup?.permissions || [],
						PermissionType.INVITE_ADMINS
					)}
					handleSearchValue={handleSearch}
					onClickButton={addAdmin}
					columns={columns}
					data={adminQuery.data}
					loading={adminQuery.isLoading}
					buttonText="Add admin"
					widthSearch={
						findPermission(
							userLoggedInfo?.role,
							userLoggedInfo?.permissionGroup?.permissions || [],
							PermissionType.INVITE_ADMINS
						)
							? "150px"
							: "50px"
					}
					conditionalRowStyles={conditionalRowStyles}
					onRowClicked={handleRowClicked}
				>
					<>
						<div>
							<BreadCrumb initialTab="Manage Users" actualTab="Admins" />
						</div>
						<div className="relative z-10">
							<Tabs
								tabs={[
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_ADMINS
									)
										? TabData.admins
										: TabData.empty,
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_INVESTORS
									)
										? TabData.investors
										: TabData.empty,
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_ACCOUNTS
									)
										? TabData.accounting
										: TabData.empty,
								]}
								actualTab="admins"
							/>
						</div>
					</>
				</Table>
			)}
			<Modal
				visible={openModal}
				onHide={closeModal}
				title="Add Admin"
				width="30vw"
			>
				<AddAdmin handleSuccess={successCreateAdmin} />
			</Modal>
			<Modal
				visible={openDeleteModal}
				onHide={closeDeleteAdminModal}
				title="Delete User"
				width="450px"
			>
				<DeleteAdmin id={deleteId} handleDeleteAdmin={handleDeleteUser} />
			</Modal>
			{selectedUser && (
				<UserConfig
					user={selectedUser}
					setUser={setSelectedUser}
					type="admin"
					callBack={handleRefetch}
					setOpenActivityModal={setDetailModal}
					activityModal={detailModal}
					deleteUser={handleDeleteAdmin}
				/>
			)}
		</>
	);
};