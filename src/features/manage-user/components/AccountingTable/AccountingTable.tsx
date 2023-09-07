import { Table } from "@/features/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useEffect, useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { DeleteAdmin } from "../DeleteAdmin/DeleteAdmin";
import { tabs } from "../../utils/tabs";
import { useQuery } from "@tanstack/react-query";
import ManageUsersService from "../../api/investors";
import type { User } from "../../types/api";
import { AddAccounting } from "../AddAccounting/AddAccounting";

interface SuccessProps {}

export const AccountingTable: React.FC<SuccessProps> = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const accountQuery = useQuery(
		["account-query"],
		() => {
			return ManageUsersService.filterAllAccounting(searchValue);
		},
		{ enabled: true, staleTime: 1 }
	);

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
		setOpenModal(false);
		void accountQuery.refetch();
	};

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	/* 	const accountMutation = useMutation(() => {
		return ManageUsersService.filterAllAccounting(searchValue);
	}); */

	useEffect(() => {
		accountQuery.refetch;
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
				loading={accountQuery.isLoading}
				data={accountQuery.data}
				buttonText="Add Accounting"
				widthSearch="185px"
				conditionalRowStyles={conditionalRowStyles}
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
				title="Delete"
				width="25vw"
			>
				<DeleteAdmin id={deleteId} />
			</Modal>
		</>
	);
};
