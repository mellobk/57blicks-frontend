import { type FC, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import LendersService from "@/api/lenders.ts";
import investorPortalsStore from "@/features/investor-portals/stores/investor-portals-store";
import { moneyFormat, percentageFormat } from "@/utils/formats.ts";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs";
import { investorPortalsTabs } from "@/features/investor-portals/utils/tabs";
import { Input } from "@/components/forms/Input";
import { Footer } from "@/features/investor-portals/component/Page/Footer/Footer";
import { FundingBreakdown } from "@/types/api/funding-breakdown.ts";

export const LLC: FC = () => {
	const [modalData, setModalData] = useState<FundingBreakdown | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const setLenderData = investorPortalsStore((state) => state.setLender);
	const lenderData = investorPortalsStore((state) => state.lenders);
	const currentMonthName = moment().format("MMMM");

	const findDkcLender = () => {
		const findLender = lenderData.find(
			(data) => data.name === "DKC lending LLC"
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
				row.loan.collaterals[0]?.address || "",
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row.loan.totalLoanAmount)),
			sortable: true,
		},
		{
			name: "Investor Equity",
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.amount)),
			sortable: true,
		},
		{
			name: "Rate",
			selector: (row: FundingBreakdown) => percentageFormat(Number(row.rate)),
			sortable: true,
		},
		{
			name: "Regular Payment",
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: (row: FundingBreakdown) => row.loan.originationDate.toString(),
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown) => row.loan.maturityDate.toString(),
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) => !!row.regular,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];
	const getLoanColumns = () => {
		const loanColumns = [];
		const months = moment.months();

		for (let month of months) {
			loanColumns.push({
				name: month,
				selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
			});
		}

		loanColumns.push({
			name: "Annual Total",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row.regular) * 12),
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) => !!row.regular,
					style: {
						background: "#0085FF1F",
						color: "#0085FF",
					},
				},
			],
		});

		return loanColumns;
	};

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div className="relative w-[115px]">
					<div className="absolute w-[200px]" style={{ top: "-8px" }}>
						<BreadCrumb initialTab="Investors" actualTab="DKC lending LLC" />
					</div>
				</div>
				<div className="relative z-10">
					<Tabs tabs={investorPortalsTabs} actualTab="dkc lending llc" />
				</div>
				<div
					className={`flex justify-end gap-2 items-center bg-primary-500 h-[50px]`}
					style={{ position: "relative", width: "180px" }}
				>
					<div
						className="flex justify-end gap-1 items-center"
						style={{ position: "absolute" }}
					>
						<div
							className="flex gap-2 justify-end"
							style={{
								position: "relative",
								right: "158px",
								width: "350px",
								zIndex: "0",
							}}
						>
							<div
								className={`${
									searchVisible || searchValue
										? "w-[200px] bg-transparent transition duration-500"
										: "bg-transparent  w-[30px] transition duration-500 "
								} `}
								onMouseEnter={() => setSearchVisible(true)}
								onMouseLeave={() => setSearchVisible(false)}
							>
								<Input
									type="text"
									value={searchValue}
									placeholder="Search"
									iconColor="white"
									iconWidth={`${searchValue ? "12" : "20"}`}
									iconName={`${searchValue ? "wrong" : "search"}`}
									onChange={(data) => setSearchValue(data.target.value)}
									clickIcon={() => setSearchValue("")}
									className={`placeholder-gray-400 text-white text-[13px] font-normal font-weight-400 leading-normal w-full ${
										searchVisible || searchValue
											? "bg-black-200  "
											: "bg-transparent "
									}  tracking-wide flex h-3 p-4 items-center self-stretch rounded-md border-none outline-none `}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col h-full gap-3 overflow-y-auto">
				<div
					className={`flex flex-col h-full ${
						modalData ? "max-h-[75vh]" : ""
					} bg-white rounded-2xl justify-between`}
				>
					<div className="rounded-t-2xl overflow-auto">
						<DataTable
							responsive={false}
							columns={columns}
							data={dkcLenderQuery.data?.fundingBreakdowns || []}
							progressPending={dkcLenderQuery?.isFetching}
							onRowClicked={setModalData}
						/>
					</div>
					<Footer data={dkcLenderQuery.data?.fundingBreakdowns || []} />
				</div>
				{modalData && (
					<div className="flex min-h-[90px] bg-white rounded-2xl overflow-auto">
						<DataTable
							responsive={false}
							columns={getLoanColumns()}
							data={[modalData]}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
