/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useEffect, useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import LendersService from "@/api/lenders";
import { Input } from "@/components/forms/Input";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { Footer } from "@/features/admin/components/investor-portals/component/Page/Footer/Footer";
import investorPortalsStore from "@/features/admin/components/investor-portals/stores/investor-portals-store";
import { investorPortalsTabs } from "@/features/admin/components/investor-portals/utils/tabs";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import { formatDate, moneyFormat, percentageFormat } from "@/utils/formats";

import PayablesAdmin from "../PayablesAdmin";

interface Props {
	actualTab: string;
	id?: string;
}

export const Page: FC<Props> = ({ actualTab, id }) => {
	const idQueryParameter = new URLSearchParams(window.location.search);
	const idParameter = idQueryParameter.get("id");
	const [selectedRow, setSelectedRow] = useState<FundingBreakdown | null>(null);
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const setLenderData = investorPortalsStore((state) => state.setLender);
	const lenderData = investorPortalsStore((state) => state.lenders);
	const currentMonthName = moment().format("MMMM");

	const findDkcLender = () => {
		const findLender = lenderData.find(
			(data) => data.name === (id || actualTab)
		);

		return findLender?.id || "";
	};

	const lendersQuery = useQuery(
		["lenders-query"],
		() => {
			return LendersService.getLenders();
		},
		{ enabled: lenderData.length <= 0 }
	);

	const lenderQuery = useQuery(
		["lender-query"],
		() => LendersService.getLenderById(findDkcLender(), searchValue),
		{ enabled: lenderData.length > 0 }
	);

	const conditionalRowStyles = [
		{
			when: (row: FundingBreakdown) => selectedRow?.id === row.id,
			style: {
				background: "#0085FF20",
			},
		},
	];

	useEffect(() => {
		if (lenderQuery.data && idParameter) {
			const foundLoan = lenderQuery.data?.fundingBreakdowns.find((data) => {
				return data.loan.id === idParameter;
			});

			setSelectedRow(foundLoan as any);
		}
	}, [lenderQuery.data, idParameter]);

	const columns = [
		{
			name: "Borrower",
			selector: (row: FundingBreakdown) => row.loan?.borrower?.llc || "",
			sortable: true,
		},
		{
			name: "Collateral Address",
			selector: (row: FundingBreakdown) =>
				row.loan?.collaterals?.[0]?.address || "",
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: (row: FundingBreakdown) =>
				moneyFormat(Number(row.loan.totalLoanAmount)),
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
			selector: (row: FundingBreakdown) =>
				formatDate(row.loan?.originationDate?.toString() || ""),
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: (row: FundingBreakdown) =>
				formatDate(row.loan?.maturityDate?.toString() || ""),
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: (row: FundingBreakdown) => moneyFormat(Number(row.regular)),
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: FundingBreakdown) => selectedRow?.id !== row.id,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
				{
					when: (row: FundingBreakdown) => selectedRow?.id === row.id,
					style: {
						background: "#0085FF3D",
						color: "#0085FF",
						borderColor: "#0085FF",
						borderWidth: 2,
					},
				},
			],
		},
	];

	useEffect(() => {
		void lenderQuery.refetch();
	}, [searchValue, lenderData]);

	useEffect(() => {
		setLenderData(lendersQuery.data || []);
	}, [lendersQuery.isSuccess]);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
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
								onMouseEnter={() => {
									setSearchVisible(true);
								}}
								onMouseLeave={() => {
									setSearchVisible(false);
								}}
							>
								<Input
									type="text"
									value={searchValue}
									placeholder="Search"
									iconColor="white"
									iconWidth={`${searchValue ? "12" : "20"}`}
									iconName={`${searchValue ? "wrong" : "search"}`}
									onChange={(data) => {
										setSearchValue(data.target.value);
									}}
									clickIcon={() => {
										setSearchValue("");
									}}
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
				<div className="flex flex-col h-full bg-white rounded-2xl justify-between overflow-y-auto">
					<Table
						className="h-full p-0 m-0 rounded-t-2xl overflow-y-auto"
						columns={columns}
						conditionalRowStyles={conditionalRowStyles}
						data={lenderQuery.data?.fundingBreakdowns || []}
						onRowClicked={setSelectedRow}
						progressPending={lenderQuery?.isFetching}
						fixedHeader
					/>
					<Footer data={lenderQuery.data?.fundingBreakdowns || []} />
				</div>

				{selectedRow && (
					<PayablesAdmin
						year={new Date().getFullYear()}
						loan={selectedRow.loan}
					/>
				)}
			</div>
		</div>
	);
};
