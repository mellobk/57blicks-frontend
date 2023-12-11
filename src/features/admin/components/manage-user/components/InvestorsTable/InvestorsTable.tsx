/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	emptyObject,
	findIndex,
	findPermission,
	statusSort,
} from "@/utils/common-functions";
import { type FC, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AddInvestor } from "../AddInvestor/AddInvestor";
import type { AddInvestorBankFields } from "../../types/fields";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { DisableInvestor } from "../DisableInvestor/DisableInvestor";
import { Icon } from "@/components/ui/Icon";
import type { Investor } from "../../types/api";
import ManageUsersService from "../../api/investors";
import { Modal } from "@/components/ui/Modal/Modal";
import { Table } from "@/features/admin/components/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { UpdateBakingInformation } from "../UpdateBakingInformation/UpdateBakingInformation";
import UserConfig from "../UserConfig/UserConfig";
import { TabData } from "../../utils/tabs";
import { EnableInvestor } from "../EnableInvestor/EnableInvestor";
import userStore from "@/stores/user-store.ts";
import { PermissionType } from "@/types/api/permissions-type";
import { useNavigate } from "@tanstack/router";
/* import ManageNotificationService from "../../../notifications/api/notification"; */

interface SuccessProps {}

export const InvestorsTable: FC<SuccessProps> = () => {
	const navigate = useNavigate();
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);

	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [checkState, setCheckState] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [idUpload, setIdUpload] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [bankInfo, setBankInfo] = useState<AddInvestorBankFields>();
	const [selectedUser, setSelectedUser] = useState<Investor | null>(null);
	const [detailModal, setDetailModal] = useState<boolean>(true);
	const [enableOpenModal, setEnableOpenModal] = useState<boolean>(false);

	const userInfo = userStore((state) => state.userInfo);

	/* 	const createLedgerQuery = useMutation(async (body: any) => {
		return ManageNotificationService.createNotifications(body);
	}); */

	const investorQuery = useQuery(
		["investor-query"],
		() => {
			return findPermission(
				userLoggedInfo?.role,
				userLoggedInfo?.permissionGroup?.permissions || [],
				PermissionType.VIEW_INVESTORS
			) ||
				findPermission(
					userLoggedInfo?.role,
					userLoggedInfo?.permissionGroup?.permissions || [],
					PermissionType.EDIT_INVESTORS
				)
				? ManageUsersService.filterAllInvestors(searchValue, checkState)
				: [];
		},
		{ enabled: true, staleTime: 1000 * 60 }
	);

	useEffect(() => {
		const find = findPermission(
			userLoggedInfo?.role,
			userLoggedInfo?.permissionGroup?.permissions || [],
			PermissionType.VIEW_INVESTORS
		);
		const findEdit = findPermission(
			userLoggedInfo?.role,
			userLoggedInfo?.permissionGroup?.permissions || [],
			PermissionType.EDIT_INVESTORS
		);

		if (!find && !findEdit && !emptyObject(userLoggedInfo)) {
			void navigate({ to: `/manage-users/accounting` });
		}

		void investorQuery.refetch();
	}, [userLoggedInfo]);

	useEffect(() => {
		if (!emptyObject(userInfo)) {
			const { investor, ...others } = userInfo;
			const investorUser = {
				...investor,
				user: others,
			};
			setSelectedUser(investorUser || null);
		}
	}, [userInfo]);

	const deleteAdminMutation = useMutation((id: string) => {
		return ManageUsersService.deleteUser(id);
	});

	const restoreInvestorMutation = useMutation((id: string) => {
		return ManageUsersService.restoreUser(id);
	});

	const handleSuccessDelete = async (): Promise<void> => {
		await investorQuery.refetch();
		setOpenDeleteModal(false);
		setDetailModal(false);
		deleteAdminMutation.reset();
	};

	const handleSuccessEnable = async (): Promise<void> => {
		await investorQuery.refetch();
		setEnableOpenModal(false);
		setDetailModal(false);
		restoreInvestorMutation.reset();
	};

	useEffect(() => {
		if (deleteAdminMutation.isSuccess) {
			void handleSuccessDelete();
		}
	}, [deleteAdminMutation]);

	useEffect(() => {
		if (restoreInvestorMutation.isSuccess) {
			void handleSuccessEnable();
		}
	}, [restoreInvestorMutation]);

	useEffect(() => {
		void investorQuery.refetch();
	}, [searchValue, checkState]);

	const handleCheckedToggle = (data: Investor) => {
		setCheckState(data.target.checked);
	};

	const handleDeleteAdmin = (id: string) => {
		setOpenDeleteModal(!openDeleteModal);
		setDeleteId(id);
	};

	const enableUser = (id: string) => {
		setEnableOpenModal(!enableOpenModal);
		setDeleteId(id);
	};
	const handleDeleteUser = (id: string) => {
		deleteAdminMutation.mutate(id);
	};

	const handleEnableUser = (id: string) => {
		restoreInvestorMutation.mutate(id);

		/* 		createLedgerQuery.mutate({
			title: "Delete User",
			timestamp: new Date(),
			content: `${userLoggedInfo.firstName} ${userLoggedInfo.lastName}  delete a user !`,
			additionalData: "",
			userFullName: `${userLoggedInfo.firstName} ${userLoggedInfo.lastName}`,
			priority: "HIGH",
			type: "ALERT",
			roles: ["super-admin"],
		}); */
	};

	const handleUploadModal = () => {
		setOpenUpdateModal(true);
	};

	const closeDeleteAdminModal = (): void => {
		setOpenDeleteModal(false);
	};

	const closeEnableModal = (): void => {
		setEnableOpenModal(false);
	};

	const addAdmin = (): void => {
		setOpenModal(true);
	};

	const closeModal = (): void => {
		setOpenModal(false);
	};

	const handleSuccessInvestor = (): void => {
		void investorQuery.refetch();
		setOpenModal(false);
	};

	const closeUploadModal = (): void => {
		setOpenUpdateModal(false);
	};

	const handleClick = (): void => {
		void investorQuery.refetch();
		setOpenUpdateModal(false);
	};

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	const handleRowClicked = (row: unknown): void => {
		setSelectedUser(row as Investor);
	};

	const handleRefetch = async (): Promise<void> => {
		await investorQuery.refetch();
	};

	const conditionalRowStyles = [
		{
			when: (row: Investor) => row.user?.isActive === false,
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
			selector: (row: Investor): number =>
				findIndex(investorQuery.data || [], row?.id || ""),
			omit: false,
		},
		{
			name: "EIN/SSN",
			selector: (row: Investor): string => row.ssnEin || "",
			sortable: true,
			omit: false,
		},
		{
			name: "Username/Email",
			selector: (row: Investor): string => row?.user?.email || "",
			sortable: true,
			omit: false,
		},
		{
			name: "Entity Name",
			selector: (row: Investor): string => row?.user?.entityName || "",
			omit: false,
		},
		{
			name: "Phone Number",
			selector: (row: Investor): string => row?.user?.phoneNumber || "",
			omit: false,
		},
		{
			name: "Mailing Address",
			selector: (row: Investor): string => row.user?.mailingAddress || "",
			omit: false,
		},
		{
			name: "Status",
			maxWidth: "50px",
			selector: (row: Investor): JSX.Element => (
				<TableStatus status={row.user?.isActive ? "Active" : "Inactive"} />
			),
			sortable: true,
			sortFunction: statusSort,
			omit: false,
		},
		{
			name: "ACH",
			maxWidth: "50px",
			selector: (row: Investor): JSX.Element => (
				<div key={row.id}>
					<Toggle
						checked={
							!!(
								row?.accountNumber ||
								row?.accountType ||
								row?.bankingName ||
								row?.accountType
							)
						}
						checkedClassName="bg-green-500"
						labelClassName="text-white text-[13px]"
					/>
				</div>
			),
			omit: false,
		},
		{
			name: "Banking",
			maxWidth: "50px",
			selector: (row: Investor): JSX.Element => (
				<div
					className="cursor-pointer"
					onClick={(): void => {
						setBankInfo({
							id: row?.id,
							accountNumber: row?.accountNumber || "",
							accountType: row?.accountType || "",
							routingNumber: row?.routingNumber || "",
							bankingName: row?.bankingName || "",
						});
						if (row?.user?.isActive) {
							setIdUpload(row?.id || "");
							handleUploadModal();
						}
					}}
				>
					<Icon name="bank" width="20" color="black" />
				</div>
			),
			omit: false,
		},
	];

	return (
		<>
			{investorQuery.data && (
				<Table
					showAddButton={findPermission(
						userLoggedInfo?.role,
						userLoggedInfo?.permissionGroup?.permissions || [],
						PermissionType.INVITE_INVESTORS
					)}
					handleSearchValue={handleSearch}
					handleCheckValue={handleCheckedToggle}
					checkedValue={checkState}
					onClickButton={addAdmin}
					loading={investorQuery.isLoading}
					columns={columns}
					data={investorQuery.data}
					buttonText="Add Investor"
					conditionalRowStyles={conditionalRowStyles}
					widthSearch={
						findPermission(
							userLoggedInfo?.role,
							userLoggedInfo?.permissionGroup?.permissions || [],
							PermissionType.INVITE_INVESTORS
						)
							? "160px"
							: "60px"
					}
					onRowClicked={handleRowClicked}
				>
					<>
						<div>
							<BreadCrumb initialTab="Manage Users" actualTab="Investors" />
						</div>
						<div className="relative z-10">
							<Tabs
								tabs={[
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_ADMINS
									) ||
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_ACCOUNTING
									)
										? TabData.admins
										: TabData.empty,
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_INVESTORS
									) ||
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_INVESTORS
									)
										? TabData.investors
										: TabData.empty,
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.VIEW_ACCOUNTS
									) ||
									findPermission(
										userLoggedInfo?.role,
										userLoggedInfo?.permissionGroup?.permissions || [],
										PermissionType.EDIT_ACCOUNTING
									)
										? TabData.accounting
										: TabData.empty,
								]}
								actualTab="investors"
							/>
						</div>
					</>
				</Table>
			)}
			<Modal
				visible={openModal}
				onHide={closeModal}
				title="Add Investor"
				width="30vw"
			>
				<AddInvestor handleSuccess={handleSuccessInvestor} />
			</Modal>

			<Modal
				visible={openUpdateModal}
				onHide={closeUploadModal}
				title="Banking Info"
				width="25vw"
			>
				<UpdateBakingInformation
					handleClick={handleClick}
					data={bankInfo}
					id={idUpload}
				/>
			</Modal>

			<Modal
				visible={openDeleteModal}
				onHide={closeDeleteAdminModal}
				title="Disable User"
				width="450px"
			>
				<DisableInvestor id={deleteId} handleDeleteUser={handleDeleteUser} />
			</Modal>

			<Modal
				visible={enableOpenModal}
				onHide={closeEnableModal}
				title="Enable User"
				width="450px"
			>
				<EnableInvestor id={deleteId} handleDeleteUser={handleEnableUser} />
			</Modal>

			{selectedUser && (
				<UserConfig
					investor={selectedUser}
					setUser={setSelectedUser}
					type="investor"
					callBack={handleRefetch}
					setOpenActivityModal={setDetailModal}
					activityModal={detailModal}
					deleteUser={handleDeleteAdmin}
					enableUser={enableUser}
				/>
			)}
		</>
	);
};
