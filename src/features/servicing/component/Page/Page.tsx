import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LendersService from "@/api/lenders";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { DkcServicing, FundingBreakdown } from "../../types/api";
import { servicingTabs } from "../../utils/tabs";
import { Table } from "./Table/Table.tsx";
import { Toggle } from "@/components/ui/Toggle";
import { ShowModal } from "@/features/servicing/component/Page/ShowModal/ShowModal.tsx";
import servicingStore from "../../stores/servicing-store";
import { moneyFormat } from "@/utils/formats";
import { validateDate } from "@/utils/common-funtions";

interface Props {
	actualTab: string;
	id?: string;
}

export const Page: FC<Props> = ({ actualTab, id }) => {
	const [modalData, setModalData] = useState<FundingBreakdown | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");
	const setLenderData = servicingStore((state) => state.setLender);
	const lenderData = servicingStore((state) => state.lenders);

	const findDkcLender = () => {
		const findLender = lenderData.find(
			(data) => data.name === (id || actualTab)
		);

		return findLender?.id || "";
	};

	const dkcLendersQuery = useQuery(
		["dkc-lenders-query"],
		() => {
			return LendersService.getLenders();
		},
		{ enabled: lenderData.length <= 0 }
	);

	const dkcLenderQuery = useQuery(
		["dkc-lender-query"],
		() => LendersService.getLenderById(findDkcLender(), searchValue),
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

	const handleRefreshData = () => {
		void dkcLenderQuery.refetch();
	};

	useEffect(() => {
		void dkcLenderQuery.refetch();
	}, [searchValue, lenderData]);

	useEffect(() => {
		if (lenderData.length <= 0) {
			setLenderData(dkcLendersQuery?.data?.data || []);
		}
	}, [dkcLendersQuery.isSuccess]);

	const columns = [
		{
			name: "Borrower",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: FundingBreakdown) =>
				`${row?.loan.borrower?.user.firstName} ${row?.loan.borrower?.user.lastName}`,
			omit: false,
		},
		{
			name: "Collateral Address",
			selector: (row: FundingBreakdown) =>
				row?.loan?.collaterals[0]?.address || "",
			sortable: true,
			omit: false,
			maxWidth: "500px",
			minWidth: "500px",
		},
		{
			name: "Total Loan",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number.parseInt(row?.loan?.totalLoanAmount)),
			sortable: true,
			omit: false,
			maxWidth: "150px",
			minWidth: "150px",
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown) => row?.rate,
			omit: false,
			maxWidth: "100px",
			minWidth: "100px",
		},
		{
			name: "Regular Payment",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number.parseInt(row?.regular)),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown) =>
				row?.loan?.originationDate.toString(),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) =>
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
			selector: (row: FundingBreakdown) => row?.loan?.maturityDate.toString(),
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: DkcServicing) => validateDate(row?.maturityDate || ""),
					style: {
						background: "#fbf4f7",
						color: "#fe3d64",
					},
				},
			],
		},
		{
			name: "Insurance Expiration Date",
			selector: (row: FundingBreakdown) =>
				row?.loan.collaterals[0]?.insuranceExpirationDate.toString() || "",
			omit: false,
			maxWidth: "200px",
			minWidth: "200px",
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) =>
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
			selector: (row: DkcServicing) => (
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
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<Table
				handleSearchValue={setSearchValue}
				columns={columns}
				data={dkcLenderQuery?.data?.fundingBreakdowns}
				loading={dkcLenderQuery?.isFetching}
				widthSearch="60px"
				onRowClicked={setModalData}
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Servicing" actualTab={actualTab} />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs tabs={servicingTabs} actualTab={actualTab.toLowerCase()} />
					</div>
				</>
			</Table>
			<ShowModal
				data={modalData || undefined}
				openModal={!!modalData}
				handleRefreshData={handleRefreshData}
				handleOnCLose={(): void => {
					setModalData(null);
				}}
			/>
		</div>
	);
};