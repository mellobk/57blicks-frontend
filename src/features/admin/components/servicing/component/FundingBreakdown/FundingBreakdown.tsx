import { Cell } from "@/components/table/Cell";
import type { FC } from "react";
import { Footer } from "@/features/admin/components/servicing/component/FundingBreakdown/Footer/Footer";
import type { FundingBreakdown as FundingBreakdownType } from "@/types/api/funding-breakdown";
import type { Loan } from "@/types/api/loan";
import type { ParticipationBreakdown } from "@/types/api/participation-breakdown";
import { Table } from "@/components/ui/Table";
import type { TableColumn } from "react-data-table-component";

interface Props {
	data?: Loan;
}

export const FundingBreakdown: FC<Props> = ({ data }) => {
	const tableData = [
		...(data?.fundingBreakdowns || []),
		...(data?.participationBreakdowns || []),
	];
	const columns: Array<
		TableColumn<FundingBreakdownType | ParticipationBreakdown>
	> = [
		{
			cell: (row): React.ReactNode => {
				console.log("🚀 ~ file: FundingBreakdown.tsx:24 ~ row:", row);
				if ("lender" in row) {
					return row.lender?.name;
				} else if ("investor" in row) {
					return `${row.investor?.user?.firstName} ${row.investor?.user?.lastName}`;
				}

				return "";
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.amount} />,
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="percentage" value={row.rate} />,
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.prorated} />,
			name: "Prorated",
			style: { padding: 0 },
		},
		{
			cell: (row) => <Cell format="money" value={row.regular} />,
			name: "Regular",
			style: { padding: 0 },
		},
	];

	return (
		<div className="rounded-xl bg-white flex flex-col justify-between overflow-y-auto">
			<Table
				className="rounded-t-xl h-[100%]"
				columns={columns}
				data={tableData}
			/>
			<div className="w-[97.5%] absolute bottom-0 mb-6 rounded-xl">
				<Footer data={tableData} />
			</div>
		</div>
	);
};
