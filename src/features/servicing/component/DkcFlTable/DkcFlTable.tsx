import { type FC, useEffect, useState } from "react";
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
import { formatCurrency } from "@/utils/common-funtions";

interface SuccessProps {}

export const DkcFlTable: FC<SuccessProps> = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalData, setModalData] = useState<FundingBreakdown>();
	const lenderData = servicingStore((state) => state.lenders);

	console.log(searchValue);

	const findDkcLender = (): string => {
		const findLender = lenderData.find(
			(data) => data.name === "DKC Lending FL"
		);

		return findLender?.id || "";
	};

	const dkcLendersFlQuery = useQuery(
		["dkc-lenders-by-id-query"],
		() => {
			return DkcLendersService.getLenderById(
				findDkcLender() || "",
				searchValue
			);
		},
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const handleSearch = (data: string) => {
		setSearchValue(data);
		return data;
	};

	const validateDate = (date: string): boolean => {
		const dateObject = new Date(date);
		const now = new Date();

		dateObject.setHours(0, 0, 0, 0);
		now.setHours(0, 0, 0, 0);

		const dateInMillie = dateObject.getTime();
		const nowInMillie = now.getTime();

		return dateInMillie < nowInMillie;
	};

	useEffect(() => {
		void dkcLendersFlQuery.refetch();
	}, [lenderData]);

	const handleRefreshData = (): void => {
		void dkcLendersFlQuery.refetch();
	};
	const findDkcLenderData = (data: FundingBreakdown) => {
		setModalData(data);
	};

	const handleRowClicked = (row: FundingBreakdown): void => {
		findDkcLenderData(row);
		setOpenModal(true);
	};

	useEffect(() => {
		void dkcLendersFlQuery.refetch();
	}, [searchValue]);

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: FundingBreakdown): string =>
				`${row?.loan.borrower.user.firstName} ${row?.loan.borrower.user.lastName}`,
			omit: false,
		},
		{
			name: "Collateral Address",
			selector: (row: FundingBreakdown): string =>
				row?.loan?.collaterals[0]?.address || "",
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: FundingBreakdown): string =>
				formatCurrency(Number.parseInt(row?.loan?.totalLoanAmount)),
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown): string => row?.rate,
			omit: false,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Regular Payment",
			selector: (row: FundingBreakdown): string =>
				formatCurrency(Number.parseInt(row?.regular)),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown): string =>
				row?.loan?.originationDate.toString(),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown): boolean =>
						validateDate(row?.loan?.originationDate.toString() || ""),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown): string =>
				row?.loan?.maturityDate.toString(),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: DkcServicing): boolean =>
						validateDate(row?.maturityDate || ""),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: FundingBreakdown): string =>
				row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown): boolean =>
						validateDate(
							row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || ""
						),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Taxed Paid",
			maxWidth: "50px",
			selector: (row: DkcServicing): JSX.Element => (
				<div key={row.id}>
					<Toggle
						checked={false}
						checkedClassName="bg-green-500"
						label="Paid"
						labelClassName="text-black text-[13px]"
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
				data={dkcLendersFlQuery?.data?.fundingBreakdowns}
				loading={dkcLendersFlQuery.isFetching}
				widthSearch="60px"
				onRowClicked={handleRowClicked}
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab="DKC Lending FL" />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab="dkc lending fl" />
					</div>
				</>
			</ServicingTable>
			<ServicingModal
				data={modalData}
				openModal={openModal}
				handleRefreshData={handleRefreshData}
				handleOnCLose={(): void => {
					setOpenModal(false);
				}}
			/>
		</>
	);
};
