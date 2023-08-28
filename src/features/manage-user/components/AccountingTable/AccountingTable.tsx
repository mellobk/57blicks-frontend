/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Table } from "@/components/forms/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { AddAdmin } from "../AddAdmin/AddAdmin";
import { DeleteAdmin } from "../DeleteAdmin/DeleteAdmin";
import { tabs } from "../../utils/tab";

interface SuccessProps {}

export const AccountingTable: React.FC<SuccessProps> = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<number>(0);
	const handleDeleteAdmin = (id: number) => {
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

	const conditionalRowStyles = [
		{
			when: (row: { status: string }) => row.status === "Inactive",
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
			selector: (row: { id: any }): any => row.id,
			omit: false,
		},
		{
			name: "name",
			selector: (row: { name: any }): any => row.name,
			sortable: true,
			omit: false,
		},
		{
			name: "Email",
			selector: (row: { email: any }): any => row.email,
			sortable: true,
			omit: false,
		},
		{
			name: "Phone Number",
			selector: (row: { phoneNumber: any }): any => row.phoneNumber,
			omit: false,
		},
		{
			name: "Mailing Address",
			selector: (row: { mailingAddress: any }): any => row.mailingAddress,
			omit: false,
		},
		{
			name: "Status",
			selector: (row: { status: any }): any => (
				<TableStatus status={row?.status} />
			),
			omit: false,
		},
		{
			name: "Delete",
			maxWidth: "50px",
			selector: (row: { id: number; status: string }): any => (
				<div
					className="cursor-pointer"
					onClick={(): void => {
						if (row?.status === "Active") {
							handleDeleteAdmin(row?.id);
						}
					}}
				>
					<Icon name="trash" width="20" color="black" />
				</div>
			),
			omit: false,
		},
	];

	const data = [
		{
			id: 1,
			name: "dayan manrique",
			email: "c@revstarconsulting.com",
			phoneNumber: "(909) 554 3402",
			mailingAddress: "123 Main St, New York, NY 10010",
			status: "Active",
		},
		{
			id: 2,
			name: "dayan manrique",
			email: "c@revstarconsulting.com",
			phoneNumber: "(909) 554 3402",
			mailingAddress: "123 Main St, New York, NY 10010",
			status: "Active",
		},
		{
			id: 3,
			name: "dayan manrique",
			email: "c@revstarconsulting.com",
			phoneNumber: "(909) 554 3402",
			mailingAddress: "123 Main St, New York, NY 10010",
			status: "Active",
		},
	];

	return (
		<>
			<Table
				widthSearch="185px"
				onClickButton={addAdmin}
				columns={columns}
				data={data}
				buttonText="Add Accounting"
				conditionalRowStyles={conditionalRowStyles}
			>
				<>
					<div>
						<BreadCrumb initialTab="Manage Users" actualTab="Accounting" />
					</div>
					<div>
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
				<AddAdmin />
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
