import { type FC, useState } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import InvestorsService from "@/api/investors";
import { Input } from "@/components/forms/Input";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { ExpandedComponent } from "@/features/investor-portals/component/LLC/ExpandedComponent/ExpandedComponent";
import { Footer } from "@/features/investor-portals/component/LLC/Footer/Footer";
import { getLoanColumns } from "@/features/investor-portals/utils/common-funtions";
import { investorPortalsTabs } from "@/features/investor-portals/utils/tabs";
import { FundingBreakdown } from "@/types/api/funding-breakdown";
import { Loan } from "@/types/api/loan";

export const LLC: FC = () => {
	const [selectedLoan, setSelectedLoan] = useState<Loan>();
	const [selectedParticipation, setSelectedParticipation] =
		useState<FundingBreakdown>();
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const currentMonthName = moment().format("MMMM");

	const investorsQuery = useQuery(["investors-query"], () =>
		InvestorsService.getInvestorsWithLoans(searchValue)
	);

	const conditionalRowStyles = [
		{
			when: (row: Loan) => selectedLoan?.id === row.id,
			style: {
				background: "#0085FF3D",
				borderColor: "#0085FF",
				borderWidth: 2,
				color: "#0085FF",
			},
		},
	];

	const columns = [
		{
			name: "Investor",
			selector: (row: Loan) => `${row?.user?.firstName} ${row?.user?.lastName}`,
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			selector: () => "--",
			sortable: true,
		},
		{
			name: "Investor Equity",
			selector: () => "--",
			sortable: true,
		},
		{
			name: "Rate",
			selector: () => "--",
			sortable: true,
		},
		{
			name: "Regular Payment",
			selector: () => "--",
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: () => "--",
			sortable: true,
		},
		{
			name: "Maturity Date",
			selector: () => "--",
			sortable: true,
		},
		{
			name: `${currentMonthName} (Current)`,
			selector: () => "--",
			sortable: true,
			conditionalCellStyles: [
				{
					when: (row: Loan) => !!row,
					style: {
						background: "#C79E631F",
						color: "#C79E63",
					},
				},
			],
		},
	];

	const selectInvestor = (loan: Loan) => {
		setSelectedLoan(loan);
		setSelectedParticipation(undefined);
	};

	const selectParticipation = (participation: FundingBreakdown) => {
		setSelectedLoan(undefined);
		setSelectedParticipation(participation);
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
					className={`flex flex-col ${
						selectedLoan ? "h-[50%]" : "h-full"
					} bg-white rounded-2xl justify-between overflow-y-auto`}
				>
					<Table
						className="h-full p-0 m-0 rounded-t-2xl overflow-y-auto"
						columns={columns}
						data={investorsQuery.data || []}
						expandableRows
						expandableRowDisabled={(row: Loan) =>
							!row.participationBreakdowns?.length
						}
						expandableRowsComponent={ExpandedComponent}
						expandableRowsComponentProps={{
							selectedParticipation,
							selectParticipation,
						}}
						onRowClicked={selectInvestor}
						conditionalRowStyles={conditionalRowStyles}
						progressPending={investorsQuery.isFetching}
						fixedHeader
					/>
					<Footer data={investorsQuery.data || []} />
				</div>
				<Table
					className={`flex flex-col ${
						selectedLoan
							? "h-[50%]"
							: selectedParticipation
							? "min-h-[88px]"
							: "hidden"
					}  bg-white rounded-2xl p-0 m-0 overflow-y-auto`}
					columns={getLoanColumns()}
					data={
						selectedLoan?.participationBreakdowns ||
						(selectedParticipation ? [selectedParticipation] : [])
					}
					fixedHeader
				/>
			</div>
		</div>
	);
};
