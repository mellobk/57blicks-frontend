import { FC, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Table } from "@/components/ui/Table";
import { Title } from "@/components/ui/Title/Title";
import { Subtitle } from "@/features/loan-overview/components/Subtitle/Subtitle";
import { Value } from "@/features/loan-overview/components/Value/Value";
import { FundingBreakdown as FundingBreakdownType } from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";
import { moneyFormat } from "@/utils/format";

export const LoanOverview: FC = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const data = {
		checkAndBalanceInterest: 0,
		checkAndBalancePrinciple: 0,
		dueToDraws: 774500,
		loansDrawnDown: 37837000,
		servicingFee: 24929.94,
		totalCollectibles: 407684.33,
		totalLoans: 38612000,
		totalParticipantsPayable: 375945.22,
		trustAccountBalance: 406500,
		yieldSpread: 6809.17,
	};
	const columns: TableColumn<FundingBreakdownType>[] = [
		{
			cell: (row: FundingBreakdownType, rowIndex) => {
				if (rowIndex === 0) {
					return (
						<button
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200"
							type="button"
						>
							<div className="flex flex-row justify-between items-center">
								{row.lender}
								<Icon name="arrowDown" width="6" color="#656A74" />
							</div>
						</button>
					);
				}

				return <div className="px-4">{row.lender}</div>;
			},
			name: "Lenders and Participants",
			style: { padding: 0 },
		},
		{
			name: "Total Loan",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
		{
			name: "Total Drawn to Date",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
          placeholder="$0.00"
					type="number"
				/>
			),
			name: "Trust-Unallocated",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
          placeholder="$0.00"
					type="number"
				/>
			),
			name: "Trust-Allocated",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
		{
			name: "Due to Draws",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
		{
			name: "Total Funds",
			selector: (row: FundingBreakdownType) => moneyFormat(row.amount),
			style: { padding: 0 },
		},
	];

	return (
		<div className="grid grid-cols-2 lg:grid-cols-7 gap-2 w-screen h-full">
			<div className="col-span-1 flex flex-col gap-2 overflow-y-auto">
				<div className="rounded-2xl bg-white">
					<Subtitle text="Principle Overview" />
					<Value label="Total Loans" value={data.totalLoans} />
					<Value label="Loans Drawn Down" value={data.loansDrawnDown} />
					<Value label="Due to Draws" value={data.dueToDraws} />
					<Value
						label="Check and Balance"
						value={data.checkAndBalancePrinciple}
						checkAndBalance
					/>
				</div>
				<div className="rounded-2xl bg-white">
					<Value
						label="Trust Account Balance"
						value={data.trustAccountBalance}
					/>
				</div>
				<div className="rounded-2xl bg-white">
					<Subtitle text="Interest Overview" />
					<Value label="Total Collectibles" value={data.totalCollectibles} />
					<Value
						label="Total Participants Payable"
						value={data.totalParticipantsPayable}
					/>
					<Value label="Servicing Fee" value={data.servicingFee} />
					<Value label="Yield Spread" value={data.yieldSpread} />
					<Value
						label="Check and Balance"
						value={data.checkAndBalanceInterest}
						checkAndBalance
					/>
				</div>
			</div>
			<div className="col-span-1 lg:col-span-6 rounded-2xl bg-white">
				<div className="flex flex-row px-8 py-6 justify-between">
					<Title text="Overview by Investors" />
					<div className="flex flex-row gap-4">
						<Button
							buttonText="Total Trust Account: $406,500.00"
							className="px-4 py-2 bg-gold-500/[.12] rounded-2xl"
							deepClassName="font-inter text-sm text-gold-500 font-semibold leading-[17px] tracking-[-0.7px]"
							icon={<Icon color="#C79E63" name="moneyBag" width="16" />}
						/>
						<div
							className={`${
								searchVisible || searchValue
									? "w-[200px] bg-transparent"
									: "bg-transparent w-[30px]"
							} transition duration-500`}
							onMouseEnter={() => setSearchVisible(true)}
							onMouseLeave={() => setSearchVisible(false)}
						>
							<Input
								type="text"
								value={searchValue}
								placeholder="Search"
								iconColor={searchVisible || searchValue ? "#0E2130" : "rgba(14, 33, 48, 0.5)"}
								iconWidth={searchValue ? "10" : "18"}
								iconName={searchValue ? "wrong" : "search"}
								onChange={(data) => setSearchValue(data.target.value)}
								clickIcon={() => setSearchValue("")}
								className={`${
									searchVisible || searchValue
										? "bg-gray-200"
										: "bg-transparent"
								} rounded-2xl w-full px-4 py-2 placeholder-primary-500/[.5] text-primary-500 text-[13px] leading-[18px] tracking-[-0.65px] caret-blue-200 items-center outline-none`}
							/>
						</div>
					</div>
				</div>
				<Table
					columns={columns}
					data={[
						{
							amount: 0,
							lender: lenders[0]?.name || "DKC Lending LLC",
							lenderId: lenders[0]?.code,
							rate: 0,
							type: "lender",
						},
						{
							amount: 0,
							lender: "DKC Servicing Fee Income",
							rate: 0,
						},
						{
							amount: 0,
							lender: "Yield Spread (optional)",
							rate: 0,
						},
					]}
				/>
			</div>
		</div>
	);
};
