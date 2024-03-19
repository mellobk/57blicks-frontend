/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/filename-case */
// eslint-disable-next-line unicorn/filename-case
import { type FC, useState, useEffect } from "react";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import InvestorsService from "@/api/investors";
import { Input } from "@/components/forms/Input";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Table } from "@/components/ui/Table";
import { Tabs } from "@/components/ui/Tabs";
import { ExpandedComponent } from "@/features/admin/components/investor-portals/component/LLC/ExpandedComponent/ExpandedComponent";
import { Footer } from "@/features/admin/components/investor-portals/component/LLC/Footer/Footer";
import { investorPortalsTabs } from "@/features/admin/components/investor-portals/utils/tabs";
import type { FundingBreakdown } from "@/types/api/funding-breakdown";
import type { Loan } from "@/types/api/loan";
import BulkApproval from "../../BulkApproval";
import PayablesAdmin from "../../component/PayablesAdmin";
import { useDebounce } from "@/hooks/debounce";
import {
	sortLLCInvestorEquity,
	sortLLCRegular,
	sortLLCTotalLoan,
} from "@/utils/common-functions";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import { moneyFormat } from "@/utils/formats";
export const LLC: FC = () => {
	const [selectedLoan, setSelectedLoan] = useState<Loan | null>();
	const [selectedParticipation, setSelectedParticipation] = useState<
		FundingBreakdown | ParticipationBreakdown | null
	>();
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const currentMonthName = moment().add(1, "months").format("MMMM");
	const previousMonthName = moment().format("MMMM");
	const debouncedSearchTerm = useDebounce(searchValue, 1000);
	const investorsQuery = useQuery(["investors-query"], () =>
		InvestorsService.getInvestorsWithLoans(searchValue)
	);

	const dateFormat = "YYYY-MM-DD"; // This is the format of your date strings
	const currentDate = moment(); // Current date
	const nextCurrentDate = moment(); // Current date
	const nexMonthDate = nextCurrentDate.add(1, "month").month();

	const currentValuePayableInvestor = (value: any) => {
		let data = "0";

		const findMonth = value.loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === currentDate.month()
				);
			}
		);

		data =
			(findMonth &&
				findMonth["payableDetails"].find(
					(data: { type: string }) =>
						data.type === "Investor" || data.type === "Lender"
				).credit) ||
			value?.prorated;

		if (value.loan.status === "DEFAULT") {
			data = String((Number(value.loan.principal) * 18) / 100 / 12);
		}
		return Number.parseFloat(data || "0");
	};

	const nextValuePayableInvestor = (value: any) => {
		let data = "0";
		const findMonth = value.loan?.payables?.find(
			(data: { [x: string]: moment.MomentInput }) => {
				// Extract the month and year from the date string
				const dataMonth = moment(data["month"], dateFormat);
				// Check if year and month are the same as the current date
				return (
					dataMonth.year() === currentDate.year() &&
					dataMonth.month() === nexMonthDate
				);
			}
		);

		data =
			(findMonth &&
				findMonth["payableDetails"].find(
					(data: { type: string }) =>
						data.type === "Investor" || data.type === "Lender"
				).credit) ||
			value?.prorated;

		if (value.loan.status === "DEFAULT") {
			data = String((Number(value.loan.principal) * 18) / 100 / 12);
		}
		return Number.parseFloat(data || "0");
	};

	useEffect(() => {
		void investorsQuery.refetch();
	}, [debouncedSearchTerm]);

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
			selector: (row: Loan) =>
				`${
					row?.user?.entityName ||
					`${row?.user?.firstName} ${row?.user?.lastName}`
				}`,
			sortable: true,
		},
		{
			name: "Total Loan Amount",
			sortFunction: sortLLCTotalLoan,
			selector: (data: FundingBreakdown) => {
				const funding =
					data?.lender?.fundingBreakdowns || data?.participationBreakdowns;

				const totalAmount = funding?.reduce(
					(accumulator: number, dataInterest) =>
						accumulator + Number.parseFloat(dataInterest.loan.principal || "0"),
					0
				);
				return <div>{moneyFormat(totalAmount)}</div>;
			},
			sortable: true,
		},
		{
			name: "Investor Equity",
			sortFunction: sortLLCInvestorEquity,
			selector: (data: FundingBreakdown) => {
				const funding =
					data?.lender?.fundingBreakdowns || data?.participationBreakdowns;

				const totalAmount = funding?.reduce(
					(accumulator: number, dataInterest) =>
						accumulator + Number.parseFloat(dataInterest.amount || "0"),
					0
				);
				return <div>{moneyFormat(totalAmount)}</div>;
			},
			sortable: true,
		},
		{
			name: "Rate",
			selector: () => " ",
			sortable: false,
		},
		{
			name: "Regular Payment",
			sortFunction: sortLLCRegular,
			selector: (data: FundingBreakdown) => {
				const funding =
					data?.lender?.fundingBreakdowns || data?.participationBreakdowns;

				const totalAmount = funding?.reduce(
					(accumulator: number, dataInterest) =>
						accumulator + Number.parseFloat(dataInterest.regular || "0"),
					0
				);
				return <div>{moneyFormat(totalAmount)}</div>;
			},
			sortable: true,
		},
		{
			name: "Origin Date",
			selector: () => "--",
			sortable: false,
		},
		{
			name: "Maturity Date",
			selector: () => "--",
			sortable: false,
		},
		{
			name: `${previousMonthName} (Current)`,
			sortFunction: sortLLCRegular,
			selector: (data: FundingBreakdown) => {
				const fundingBreakdowns = data.lender?.fundingBreakdowns ?? [];
				const participationBreakdownsArray = data.participationBreakdowns ?? [];

				const funding = [...participationBreakdownsArray, ...fundingBreakdowns];

				const totalAmount = funding?.reduce(
					(accumulator: number, dataInterest) =>
						accumulator + Number(currentValuePayableInvestor(dataInterest)),
					0
				);
				return <div>{moneyFormat(totalAmount)}</div>;
			},
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
		{
			name: `${currentMonthName} `,
			sortFunction: sortLLCRegular,
			selector: (data: FundingBreakdown) => {
				const fundingBreakdowns = data.lender?.fundingBreakdowns ?? [];
				const participationBreakdownsArray = data.participationBreakdowns ?? [];

				const funding = [...participationBreakdownsArray, ...fundingBreakdowns];

				const totalAmount = funding?.reduce(
					(accumulator: number, dataInterest) =>
						accumulator +
						Number(
							nextValuePayableInvestor(dataInterest) ||
								currentValuePayableInvestor(dataInterest)
						),
					0
				);
				return <div>{moneyFormat(totalAmount)}</div>;
			},
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
		setSelectedParticipation(null);
	};

	const selectParticipation = (
		participation: FundingBreakdown | ParticipationBreakdown
	) => {
		setSelectedLoan(null);
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
								width: "400px",
								zIndex: "0",
							}}
						>
							<div
								className={` flex flex-col${
									searchVisible || searchValue
										? "w-[200px] bg-transparent transition duration-500"
										: "bg-transparent  w-[185px] transition duration-500 "
								} `}
							>
								<div className="mr-2">
									<BulkApproval />
								</div>
								<div
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
			</div>
			<div className="flex flex-col h-full gap-3 overflow-y-auto">
				<div
					className={`flex flex-col ${
						selectedLoan ? "h-[50%]" : "h-full"
					} bg-white rounded-2xl justify-between overflow-y-auto`}
				>
					<Table
						className="h-full p-0 m-0 rounded-t-2xl overflow-y-auto"
						columns={columns as any}
						data={investorsQuery.data || []}
						expandableRows
						expandableRowDisabled={(row: Loan) =>
							!row.participationBreakdowns?.length &&
							!row.lender?.fundingBreakdowns?.length
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

				{selectedParticipation && (
					<PayablesAdmin
						year={new Date().getFullYear()}
						loan={selectedParticipation.loan}
						participation={selectedParticipation}
					/>
				)}
				{selectedLoan && (
					<PayablesAdmin year={new Date().getFullYear()} loan={selectedLoan} />
				)}
			</div>
		</div>
	);
};
