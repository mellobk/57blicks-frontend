import { Table } from "@/components/forms/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { DisableInvestor } from "../DisableInvestor/DisableInvestor";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { AddInvestor } from "../AddInvestor/AddInvestor";
import { UpdateBakingInformation } from "../UpdateBakingInformation/UpdateBakingInformation";
import { tabs } from "../../utils/tabs";

interface SuccessProps {}

export const InvestorsTable: React.FC<SuccessProps> = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [checkState, setCheckState] = useState<boolean>(true);
	const [deleteId, setDeleteId] = useState<number>(0);

	const handleCheckedTableToggle = (id: number, data: any) => {
		console.log(id, data);
	};

	const handleCheckedToggle = (data: any) => {
		setCheckState(!checkState);
		console.log(data);
	};

	const handleDeleteAdmin = (id: number) => {
		console.log(id);
		setOpenDeleteModal(!openDeleteModal);
		setDeleteId(id);
	};

	const handleUploadModal = (id: number) => {
		console.log(id);
		setOpenUpdateModal(!openUpdateModal);
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

	const closeUploadModal = (): void => {
		setOpenUpdateModal(!openUpdateModal);
	};

	const handleClick = (): void => {
		setOpenUpdateModal(!openUpdateModal);
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
			name: "EIN/SSN    ",
			selector: (row: { einSsn: any }): any => row.einSsn,
			sortable: true,
			omit: false,
		},
		{
			name: "Username/Email",
			selector: (row: { email: any }): any => row.email,
			sortable: true,
			omit: false,
		},
		{
			name: "Entity Name",
			selector: (row: { entityName: any }): any => row.entityName,
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
			maxWidth: "50px",
			selector: (row: { status: any }): any => (
				<TableStatus status={row?.status} />
			),
			omit: false,
		},
		{
			name: "ACH",
			maxWidth: "50px",
			selector: (row: { id: number; ach: boolean }): any => (
				<div key={row.id}>
					<Toggle
						checkedClassName="bg-green-500"
						checkLabel=""
						checkLabelClassName="text-white text-[13px]"
						onChecked={(data): void => {
							if (handleCheckedTableToggle) {
								handleCheckedTableToggle(row.id, data);
							}
						}}
						checked={row.ach}
					/>
				</div>
			),
			omit: false,
		},
		{
			name: "Banking",
			maxWidth: "50px",
			selector: (row: { id: number; status: string }): any => (
				<div
					className="cursor-pointer"
					onClick={(): void => {
						if (row?.status === "Active") {
							handleUploadModal(row?.id);
						}
					}}
				>
					<Icon name="bank" width="20" color="black" />
				</div>
			),
			omit: false,
		},
		{
			name: "Disable",
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
					{row?.status === "Active" && (
						<Icon name="deleteBack" width="20" color="black" />
					)}
				</div>
			),
			omit: false,
		},
	];

	const data = [
		{
			id: 1,
			einSsn: "4122",
			email: "b@revstarconsulting.com",
			entityName: "RevStar Consulting",
			phoneNumber: "(909) 554 3402",
			mailingAddress: "123 Main St, New York, NY 10010",
			status: "Inactive",
			ach: false,
		},
		{
			id: 2,
			einSsn: "4122",
			email: "c@revstarconsulting.com",
			entityName: "RevStar Consulting",
			phoneNumber: "(909) 554 3402",
			mailingAddress: "123 Main St, New York, NY 10010",
			status: "Active",
			ach: true,
		},
	];

	return (
		<>
			<Table
				handleCheckValue={handleCheckedToggle}
				checkedValue={checkState}
				onClickButton={addAdmin}
				columns={columns}
				data={data}
				buttonText="Add Investor"
				conditionalRowStyles={conditionalRowStyles}
			>
				<>
					<div>
						<BreadCrumb initialTab="Manage Users" actualTab="Investors" />
					</div>
					<div>
						<Tabs tabs={tabs} actualTab="investors" />
					</div>
				</>
			</Table>
			<Modal
				visible={openModal}
				onHide={closeModal}
				title="Add Investor"
				width="30vw"
			>
				<AddInvestor />
			</Modal>

			<Modal
				visible={openUpdateModal}
				onHide={closeUploadModal}
				title="Banking Info"
				width="25vw"
			>
				<UpdateBakingInformation handleClick={handleClick} />
			</Modal>

			<Modal
				visible={openDeleteModal}
				onHide={closeDeleteAdminModal}
				title="Banking Info"
				width="25vw"
			>
				<DisableInvestor id={deleteId} />
			</Modal>
		</>
	);
};
