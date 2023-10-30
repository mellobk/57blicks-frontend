import { type FC, type ReactElement, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AddAccounting } from "../AddAccounting/AddAccounting";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { DeleteAdmin } from "../DeleteAdmin/DeleteAdmin";
import ManageUsersService from "../../api/investors";
import { Modal } from "@/components/ui/Modal/Modal";
import { Table } from "@/features/admin/components/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { User } from "../../types/api";
import UserConfig from "../UserConfig/UserConfig";
import { emptyObject, findIndex } from "@/utils/common-funtions";
import { tabs } from "../../utils/tabs";
import manageUserStore from "@/features/manage-user/stores/manage-user-store";


export const AccountingTable: FC = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [detailModal, setDetailModal] = useState<boolean>(true);

	const accountQuery = useQuery(
		["account-query"],
		() => {
			return ManageUsersService.filterAllAccounting(searchValue);
		},
		{ enabled: true, staleTime: 1000 * 60 }
	);

     const userInfo = manageUserStore((state) => state.userInfo);


 useEffect(()=>{
if(!emptyObject(userInfo)){
  setSelectedUser(userInfo)
 }
 },[userInfo])

	const deleteAdminMutation = useMutation((id: string) => {
		return ManageUsersService.deleteUser(id);
	});

	const handleSuccessDelete = async (): Promise<void> => {
		await accountQuery.refetch();
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
		console.log(id);
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
		setOpenModal(!openModal);
	};

	const successCreateAccounting = (): void => {
		void accountQuery.refetch();
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
		await accountQuery.refetch();
	};

	useEffect(() => {
		void accountQuery.refetch();
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
				findIndex(accountQuery.data || [], row?.id || ""),
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
			selector: (row: User): ReactElement => (
				<TableStatus status={row.isActive ? "Active" : "Inactive"} />
			),
			sortable: true,
			omit: false,
		},
	];

	return (
		<>
			{accountQuery.data && (
				<Table
					handleSearchValue={handleSearch}
					onClickButton={addAdmin}
					columns={columns}
					loading={accountQuery.isLoading}
					data={accountQuery.data}
					buttonText="Add Accounting"
					widthSearch="185px"
					conditionalRowStyles={conditionalRowStyles}
					onRowClicked={handleRowClicked}
				>
					<>
						<div>
							<BreadCrumb initialTab="Manage Users" actualTab="Accounting" />
						</div>
						<div className="relative z-10">
							<Tabs tabs={tabs} actualTab="accounting" />
						</div>
					</>
				</Table>
			)}
			<Modal
				visible={openModal}
				onHide={closeModal}
				title="Add Accounting"
				width="30vw"
			>
				<AddAccounting handleSuccess={successCreateAccounting} />
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
					type="accounting"
					callBack={handleRefetch}
					setOpenActivityModal={setDetailModal}
					activityModal={detailModal}
					deleteUser={handleDeleteAdmin}
				/>
			)}
		</>
	);
};
