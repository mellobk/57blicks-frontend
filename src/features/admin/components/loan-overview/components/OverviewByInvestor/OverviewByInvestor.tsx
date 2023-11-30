import { type FC, useState } from "react";
import { createTheme, type TableColumn } from "react-data-table-component";
import type { ExpanderComponentProps } from "react-data-table-component/dist/src/DataTable/types";
import { useForm } from "react-hook-form";
import { Input } from "@/components/forms/Input";
import { Cell } from "@/components/table/Cell";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Table } from "@/components/ui/Table";
import { Title } from "@/components/ui/Title";
import { ExpandedComponent } from "@/features/admin/components/loan-overview/components/ExpandedComponent/ExpandedComponent";
import { Footer } from "@/features/admin/components/loan-overview/components/Footer/Footer";
import type { IInvestorOverview, ILoanOverview } from "../../types/fields";

type Props = {
	data: ILoanOverview;
};

export const OverviewByInvestor: FC<Props> = ({ data }) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchVisible, setSearchVisible] = useState<boolean>(false);
	const { control } = useForm<ILoanOverview>({
		defaultValues: data,
	});
	const columns: Array<TableColumn<IInvestorOverview>> = [
		{
			cell: (row) => <Cell format="text" value={row.name} />,
			name: "Lenders and Participants",
			selector: (row) => row.name,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.totalLoan} />,
			name: "Total Loan",
			selector: (row) => row.totalLoan,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.totalDrawnToDate} />,
			name: "Total Drawn to Date",
			selector: (row) => row.totalDrawnToDate,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.trustUnallocated} />,
			name: "Trust-Unallocated",
			selector: (row) => row.trustUnallocated,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.trustAllocated} />,
			name: "Trust-Allocated",
			selector: (row) => row.trustAllocated,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.dueToDraws} />,
			name: "Due to Draws",
			selector: (row) => row.dueToDraws,
			sortable: true,
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.totalFunds} />,
			name: "Total Funds",
			selector: (row) => row.totalFunds,
			sortable: true,
			style: { padding: 0 },
		},
	];

	createTheme("overview", {
		background: {
			default: "rgba(237, 243, 245, 0.35)",
		},
	});

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-row px-8 py-6 justify-between">
				<Title text="Overview by Investors" />
				<div className="flex flex-row gap-4">
					<Button
						buttonText="Total Trust Account: $406,500.00"
						className="px-4 py-2 bg-gold-500/[.12] rounded-2xl"
						variant={"info"}
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
					className="p-0 m-0"
					columns={columns}
					data={data.overviewByInvestors}
					expandableRows
					expandableRowDisabled={(row: IInvestorOverview) =>
						row.participants!.length === 0
					}
					expandableRowsComponent={({
						...props
					}: ExpanderComponentProps<IInvestorOverview>) => (
						<ExpandedComponent control={control} {...props} />
					)}
					theme="overview"
				/>

				<Footer data={[]} />
			</div>
		</div>
	);
};
