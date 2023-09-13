import { type FC, useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Table } from "@/components/ui/Table";
import { Title } from "@/components/ui/Title/Title";
import { Cell } from "@/features/loan-overview/components/Cell/Cell";
import { CellInput } from "@/features/loan-overview/components/CellInput/CellInput";
import { ExpandedComponent } from "@/features/loan-overview/components/ExpandedComponent/ExpandedComponent";
import type {
	FundingBreakdown,
	LoanOverviewFields,
} from "@/features/loan-overview/types/fields";
import { Footer } from "@/features/loan-overview/components/Footer/Footer.tsx";

type Props = {
	data: LoanOverviewFields;
};

export const OverviewByInvestor: FC<Props> = ({ data }) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const columns: Array<TableColumn<FundingBreakdown>> = [
		{
			cell: (row) => <Cell type="text" value={row.lender} />,
			name: "Lenders and Participants",
			selector: (row) => row.lender,
			sortable: true,
		},
		{
			cell: (row) => <Cell type="number" value={row.totalLoan} />,
			name: "Total Loan",
			selector: (row) => row.totalLoan,
			sortable: true,
		},
		{
			cell: (row) => <Cell type="number" value={row.totalDrawn} />,
			name: "Total Drawn to Date",
			selector: (row) => row.totalDrawn,
			sortable: true,
		},
		{
			cell: (row) => <CellInput value={row.trustUnallocated} />,
			name: "Trust-Unallocated",
			selector: (row) => row.trustUnallocated,
			sortable: true,
		},
		{
			cell: (row) => <CellInput value={row.trustAllocated} />,
			name: "Trust-Allocated",
			selector: (row) => row.trustAllocated,
			sortable: true,
		},
		{
			cell: (row) => <Cell type="number" value={row.dueToDraws} />,
			name: "Due to Draws",
			selector: (row) => row.dueToDraws,
			sortable: true,
		},
		{
			cell: (row) => <Cell type="number" value={row.totalFunds} />,
			name: "Total Funds",
			selector: (row) => row.totalFunds,
			sortable: true,
		},
	];

	return (
		<div className="flex flex-col h-full">
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
							iconColor={
								searchVisible || searchValue
									? "#0E2130"
									: "rgba(14, 33, 48, 0.5)"
							}
							iconWidth={searchValue ? "10" : "18"}
							iconName={searchValue ? "wrong" : "search"}
							onChange={(data) => {
								setSearchValue(data.target.value);
							}}
							clickIcon={() => {
								setSearchValue("");
							}}
							className={`${
								searchVisible || searchValue ? "bg-gray-200" : "bg-transparent"
							} rounded-2xl w-full px-4 py-2 placeholder-primary-500/[.5] text-primary-500 text-[13px] leading-[18px] tracking-[-0.65px] caret-blue-200 items-center outline-none`}
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col h-full justify-between">
				<Table
					columns={columns}
					data={data.fundingBreakdown}
					expandableRows
					expandableRowDisabled={(row) => !row.participants?.length}
					expandableRowsComponent={ExpandedComponent}
				/>

				<Footer data={data} />
			</div>
		</div>
	);
};
