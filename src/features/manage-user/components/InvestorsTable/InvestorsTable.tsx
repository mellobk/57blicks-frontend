/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Table } from "@/features/manage-user/components/Table";
import { TableStatus } from "../TableStatus/TableStatus";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal/Modal";
import { useEffect, useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { DisableInvestor } from "../DisableInvestor/DisableInvestor";
import { Toggle } from "@/components/ui/Toggle/Toggle";
import { AddInvestor } from "../AddInvestor/AddInvestor";
import { UpdateBakingInformation } from "../UpdateBakingInformation/UpdateBakingInformation";
import { tabs } from "../../utils/tabs";
import type { Investor } from "../../types/api";
import ManageUsersService from "../../api/investors";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AddInvestorBankFields } from "../../types/fields";
import { statusSort } from "@/utils/common-funtions";

interface SuccessProps {}

export const InvestorsTable: React.FC<SuccessProps> = () => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
	const [checkState, setCheckState] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const [idUpload, setIdUpload] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [bankInfo, setBankInfo] = useState<AddInvestorBankFields>();

	const investorQuery = useQuery(
		["investor-query"],
		() => {
			return ManageUsersService.filterAllInvestors(searchValue, checkState);
		},
		{ enabled: true, staleTime: 1 }
	);

	const deleteAdminMutation = useMutation((id: string) => {
		return ManageUsersService.deleteUser(id);
	});

	useEffect(() => {
		if (deleteAdminMutation.isSuccess) {
			void investorQuery.refetch();
			setOpenDeleteModal(false);
		}
	}, [deleteAdminMutation]);

	useEffect(() => {
		void investorQuery.refetch();
	}, [searchValue, checkState]);

	const handleCheckedToggle = (data: Investor) => {
		setCheckState(data.target.checked);
	};

	const handleDeleteAdmin = (id: string) => {
		console.log(id);
		setOpenDeleteModal(!openDeleteModal);
		setDeleteId(id);
	};

	const handleDeleteUser = (id: string) => {
		deleteAdminMutation.mutate(id);
	};

	const handleUploadModal = () => {
		setOpenUpdateModal(!openUpdateModal);
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

	const handleSuccessInvestor = (): void => {
		void investorQuery.refetch();
		setOpenModal(false);
	};

	const closeUploadModal = (): void => {
		setOpenUpdateModal(!openUpdateModal);
	};

	const handleClick = (): void => {
		void investorQuery.refetch();
		setOpenUpdateModal(false);
	};

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
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
			selector: (row: Investor): string => row.id || "",
			omit: false,
		},
		{
			name: "EIN/SSN    ",
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
						checkedClassName="bg-green-500"
						checkLabel=""
						checkLabelClassName="text-white text-[13px]"
						checked={
							!!(
								row?.accountNumber ||
								row?.accountType ||
								row?.bankingName ||
								row?.accountType
							)
						}
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
		{
			name: "Disable",
			maxWidth: "50px",
			selector: (row: Investor): any => (
				<div
					className="cursor-pointer"
					onClick={(): void => {
						if (row?.user?.isActive) {
							console.log(row);
							handleDeleteAdmin(row?.user.id || "");
						}
					}}
				>
					{row?.user?.isActive && (
						<Icon name="deleteBack" width="20" color="black" />
					)}
				</div>
			),
			omit: false,
		},
	];

	return (
		<>
			<Table
				handleSearchValue={handleSearch}
				handleCheckValue={handleCheckedToggle}
				checkedValue={checkState}
				onClickButton={addAdmin}
				loading={investorQuery.isLoading}
				columns={columns}
				data={investorQuery.data}
				buttonText="Add Investor"
				conditionalRowStyles={conditionalRowStyles}
				widthSearch="160px"
			>
				<>
					<div>
						<BreadCrumb initialTab="Manage Users" actualTab="Investors" />
					</div>
					<div className="relative z-10">
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
				title="Banking Info"
				width="25vw"
			>
				<DisableInvestor id={deleteId} handleDeleteUser={handleDeleteUser} />
			</Modal>
		</>
	);
};
