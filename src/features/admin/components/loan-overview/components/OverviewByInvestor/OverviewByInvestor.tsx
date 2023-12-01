import { useState, type FC } from "react";
import { Title } from "@/components/ui/Title";
import { Footer } from "@/features/admin/components/loan-overview/components/Footer/Footer";
import type { ILoanOverview } from "../../types/fields";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ParticipantTable } from "../ParticipantTable/ParticipantTable";

type Props = {
	data: ILoanOverview;
};

export const OverviewByInvestor: FC<Props> = ({ data }) => {
	const [expandedRows, setExpandedRows] = useState<Array<ILoanOverview>>([]);

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-row px-8 py-6 justify-between">
				<Title text="Overview by Investors" />
			</div>

			<div className="flex flex-col h-full justify-between">
				<DataTable
					value={data.overviewByInvestors}
					expandedRows={expandedRows}
					onRowToggle={(event) => {
						setExpandedRows(event.data as Array<ILoanOverview>);
					}}
					rowExpansionTemplate={(data) => {
						return data.participants && data.participants.length > 0 ? (
							<ParticipantTable participants={data.participants} />
						) : null;
					}}
				>
					<Column expander style={{ width: "3em" }} />
					<Column field="name" header="Lender"></Column>
					<Column field="totalLoan" header="Total Loan"></Column>
					<Column
						field="totalDrawnToDate"
						header="Total Drawn to Date"
					></Column>
					<Column field="trustUnallocated" header="Trust Unallocated"></Column>
					<Column field="trustAllocated" header="Trust Allocated"></Column>
					<Column field="dueToDraws" header="Construction holdback"></Column>
					<Column field="totalFunds" header="Total Funds"></Column>
				</DataTable>
				<Footer data={[]} />
			</div>
		</div>
	);
};
