import { Table } from "@/features/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useEffect, useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { AddAdmin } from "../AddAdmin/AddAdmin";
import { DeleteAdmin } from "../DeleteAdmin/DeleteAdmin";
import { tabs } from "../../utils/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { User } from "../../types/api";
import ManageUsersService from "../../api/investors";

interface SuccessProps {}

export const AdminTable: React.FC<SuccessProps> = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");

	const adminQuery = useQuery(
		["admin-query"],
		() => {
			return ManageUsersService.filterAllAdmins(searchValue);
		},
		{ enabled: true, staleTime: 1 }
	);

	const deleteAdminMutation = useMutation((id: string) => {
		return ManageUsersService.deleteUser(id);
	});

	useEffect(() => {
		if (deleteAdminMutation.isSuccess) {
			void adminQuery.refetch();
			setOpenDeleteModal(false);
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
			selector: (row: User): string => row?.id || "",
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
		{
			name: "Delete",
			maxWidth: "50px",
			selector: (row: User): JSX.Element => (
				<div
					className="cursor-pointer"
					onClick={(): void => {
						handleDeleteAdmin(row?.id || "");
					}}
				>
					<Icon name="trashBin" width="20" color="black" />
				</div>
			),
			omit: false,
		},
	];

	return (
		<>
			<Table
				handleSearchValue={handleSearch}
				onClickButton={addAdmin}
				columns={columns}
				data={adminQuery.data}
				loading={adminQuery.isLoading}
				buttonText="Add admin"
				widthSearch="150px"
				conditionalRowStyles={conditionalRowStyles}
			>
				<>
					<div>
						<BreadCrumb initialTab="Manage Users" actualTab="Admins" />
					</div>
					<div className="relative z-10">
						<Tabs tabs={tabs} actualTab="admins" />
					</div>
				</>
			</Table>
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
				title="Delete"
				width="25vw"
			>
				<DeleteAdmin id={deleteId} handleDeleteAdmin={handleDeleteUser} />
			</Modal>
		</>
	);
};
