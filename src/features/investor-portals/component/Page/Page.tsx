import { type FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BreadCrumb } from "@/components/ui/BreadCrumb/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { FundingBreakdown } from "../../types/api";
import { investorPortalsTabs } from "../../utils/tabs";
import { Table } from "./Table/Table.tsx";
import investorPortalsStore from "../../stores/investor-portals-store";
import DkcLendersService from "../../api/investor-portals";
import { moneyFormat, percentageFormat } from "@/utils/formats";
import moment from "moment";
import DataTable from "react-data-table-component";

interface Props {
	actualTab: string;
	id?: string;
}

export const Page: FC<Props> = ({ actualTab, id }) => {
	const [modalData, setModalData] = useState<FundingBreakdown | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");
	const setLenderData = investorPortalsStore((state) => state.setLender);
	const lenderData = investorPortalsStore((state) => state.lenders);
	const currentMonthName = moment().format("MMMM");

	const findDkcLender = () => {
		const findLender = lenderData.find(
			(data) => data.name === (id || actualTab)
		);

		return findLender?.id || "";
	};

	const dkcLendersQuery = useQuery(
		["dkc-lenders-query"],
		() => {
			return DkcLendersService.getLenders();
		},
		{ enabled: lenderData.length <= 0 }
	);

	const dkcLenderQuery = useQuery(
		["dkc-lender-query"],
		() => DkcLendersService.getLenderById(findDkcLender(), searchValue),
		{ enabled: true, staleTime: 1000 * 60 * 60 * 24 }
	);

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
			name: "Investor",
			selector: (row: FundingBreakdown) =>
				`${row?.loan.borrower?.user.firstName} ${row?.loan.borrower?.user.lastName}`,
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row?.loan?.totalLoanAmount)),
			sortable: true,
		},
		{
			name: "Investor Equity",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row?.loan?.totalLoanAmount)),
			sortable: true,
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown) => percentageFormat(Number(row?.rate)),
			sortable: true,
		},
		{
			name: "Regular Payment",
			selector: (row: FundingBreakdown) => moneyFormat(Number(row?.regular)),
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown) =>
				row?.loan?.originationDate.toString(),
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown) => row?.loan?.maturityDate.toString(),
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row?.loan?.totalLoanAmount)),
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) => !!row?.loan?.totalLoanAmount,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];

	return (
		<div className="flex flex-col items-center  gap-3 h-full w-full rounded-3xl">
			<Table
				handleSearchValue={setSearchValue}
				columns={columns}
				data={dkcLenderQuery?.data?.fundingBreakdowns}
				loading={dkcLenderQuery?.isFetching}
				onRowClicked={setModalData}
			>
				<>
					<div className="relative w-[115px]">
						<div className="absolute w-[200px]" style={{ top: "-8px" }}>
							<BreadCrumb initialTab="Investors" actualTab={actualTab} />
						</div>
					</div>

					<div className="relative z-10">
						<Tabs
							tabs={investorPortalsTabs}
							actualTab={actualTab.toLowerCase()}
						/>
					</div>
				</>
			</Table>
			{modalData && (
        <div className="rounded-3xl h-[100%] overflow-auto">
          <DataTable
            responsive={false}
            columns={columns}
            data={[]}
            className="h-[50vh]"
          />
        </div>
			)}
		</div>
	);
};
