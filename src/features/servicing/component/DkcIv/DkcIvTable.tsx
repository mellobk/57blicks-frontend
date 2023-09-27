import { useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing, FundingBreakdown } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { ServicingTable } from "../ServicingTable";
import { Toggle } from "@/components/ui/Toggle";
import { ServicingModal } from "../ServicingModal/ServicingModal";
import servicingStore from "../../stores/servicing-store";
import { useQuery } from "@tanstack/react-query";
import DkcLendersService from "../../api/servicing";

interface SuccessProps {}

export const DkcIvTable: React.FC<SuccessProps> = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const lenderData = servicingStore((state) => state.lenders);

	console.log(searchValue);

	const findDkcLender = (): string => {
		const findLender = lenderData.find(
			(data) => data.name === "DKC Lending IV"
		);

		return findLender?.id || "";
	};

	const dkcLendersQuery = useQuery(
		["dkc-lenders-by-id-query"],
		() => {
			return DkcLendersService.getLenderById(findDkcLender() || "");
		},
		{ enabled: true }
	);
	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	const validateDate = (date: string): boolean => {
		console.log(date);
		const dateObject = new Date(date);
		const now = new Date();

		dateObject.setHours(0, 0, 0, 0);
		now.setHours(0, 0, 0, 0);

		const dateInMillie = dateObject.getTime();
		const nowInMillie = now.getTime();

		if (dateInMillie < nowInMillie) {
			return true;
		}
		return false;
	};

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: FundingBreakdown): JSX.Element => (
				<div
					onClick={(): void => {
						setOpenModal(true);
					}}
				>
					{`${row?.loan.borrower.user.firstName} ${row?.loan.borrower.user.lastName}`}
				</div>
			),
			omit: false,
		},
		{
			name: "Collateral Address",
			selector: (row: FundingBreakdown): JSX.Element => (
				<div
					onClick={(): void => {
						setOpenModal(true);
					}}
				>
					{row?.loan?.collaterals[0]?.address || ""}
				</div>
			),
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: FundingBreakdown): JSX.Element => (
				<div
					onClick={(): void => {
						setOpenModal(true);
					}}
				>
					{row?.loan.totalLoanAmount}
				</div>
			),
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown): JSX.Element => (
				<div
					onClick={(): void => {
						setOpenModal(true);
					}}
				>
					{row?.rate}
				</div>
			),
			omit: false,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Monthly Payment",
			selector: (): JSX.Element => (
				<div
					onClick={(): void => {
						setOpenModal(true);
					}}
				>
					{""}
				</div>
			),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown): JSX.Element =>
				(
					<div
						onClick={(): void => {
							setOpenModal(true);
						}}
					>
						{row?.loan?.originationDate.toString()}
					</div>
				) || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown): JSX.Element =>
				(
					<div
						onClick={(): void => {
							setOpenModal(true);
						}}
					>
						{row?.loan?.maturityDate.toString()}
					</div>
				) || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			when: (row: FundingBreakdown): boolean => {
				return validateDate(row?.loan?.maturityDate.toString() || "");
			},
			style: {
				background: "#fbf4f7",
				color: "#fe3d64",
			},
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: FundingBreakdown): string =>
				row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			when: (row: DkcServicing): boolean => {
				return validateDate(row?.maturityDate || "");
			},
			style: {
				background: "#fbf4f7",
				color: "#fe3d64",
			},
		},
		{
			name: "Taxed Paid",
			maxWidth: "50px",
			selector: (row: DkcServicing): JSX.Element => (
				<div key={row.id}>
					<Toggle
						checkedClassName="bg-green-500"
						checkLabel="Paid"
						checkLabelClassName="text-black text-[13px]"
						checked={false}
					/>
				</div>
			),
			omit: false,
		},
	];
	return (
		<>
			<ServicingTable
				handleSearchValue={handleSearch}
				columns={columns}
				data={dkcLendersQuery?.data?.fundingBreakdowns}
				loading={dkcLendersQuery.isLoading}
				widthSearch="60px"
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending IV" />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="dkc lending iv" />
					</div>
				</>
			</ServicingTable>

			<ServicingModal
				openModal={openModal}
				handleOnCLose={(): void => {
					setOpenModal(false);
				}}
			/>
		</>
	);
};
